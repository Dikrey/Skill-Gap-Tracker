-- ============================================================
-- Skill Gap Tracker — Supabase SQL Schema
-- Jalankan di Supabase SQL Editor (Settings → SQL Editor)
-- ============================================================

-- Enable UUID
create extension if not exists "uuid-ossp";

-- Enable pgvector (for RAG semantic search)
create extension if not exists vector;

-- ── 1. job_roles (Master Data) ────────────────────────────────
-- HARUS DIBUAT DULU karena direferensi oleh table lain
create table public.job_roles (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null unique,
  description text,
  created_at  timestamptz default now()
);

-- ── 2. skills (Master Data) ───────────────────────────────────
create table public.skills (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null unique,
  category    text,           -- 'programming' | 'tools' | 'knowledge' | 'design'
  created_at  timestamptz default now()
);

-- ── 3. job_role_skills (Relasi Role ↔ Skill) ─────────────────
create table public.job_role_skills (
  id          uuid primary key default uuid_generate_v4(),
  job_role_id uuid not null references public.job_roles(id) on delete cascade,
  skill_id    uuid not null references public.skills(id) on delete cascade,
  importance  text not null default 'required', -- 'required' | 'nice_to_have'
  unique (job_role_id, skill_id)
);

-- ── 4. job_requirements (RAG Data — dikurasi tim) ─────────────
-- Menyimpan job descriptions dengan vector embeddings untuk similarity search
-- NOTE: Fitur ini optional, bisa diisi nanti kalau mau pakai RAG
create table public.job_requirements (
  id          uuid primary key default uuid_generate_v4(),
  job_role_id uuid not null references public.job_roles(id) on delete cascade,
  title       text not null,        -- Judul job posting (contoh: "Senior Frontend Dev at Tokopedia")
  content     text not null,        -- Isi job description lengkap
  source      text,                 -- Sumber data (Glints, Jobstreet, LinkedIn, dll)
  embedding   vector(1536),         -- Reduced to 1536 dims (compatible with most embedding models)
  created_at  timestamptz default now()
);

-- Fungsi untuk vector similarity search (cosine distance)
create or replace function match_job_requirements(
  query_embedding vector(1536),
  match_role_id   uuid,
  match_threshold float default 0.5,
  match_count     int default 5
)
returns table (
  id          uuid,
  title       text,
  content     text,
  source      text,
  similarity  float
)
language sql stable
as $$
  select
    jr.id,
    jr.title,
    jr.content,
    jr.source,
    1 - (jr.embedding <=> query_embedding) as similarity
  from public.job_requirements jr
  where
    jr.job_role_id = match_role_id
    and 1 - (jr.embedding <=> query_embedding) > match_threshold
  order by jr.embedding <=> query_embedding
  limit match_count;
$$;

-- Index untuk mempercepat vector search (ivfflat max 2000 dims di Supabase)
create index on public.job_requirements using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- ── 5. profiles ───────────────────────────────────────────────
-- id sama dengan auth.users.id (1-to-1)
create table public.profiles (
  id               uuid primary key references auth.users(id) on delete cascade,
  current_position text,
  target_role_id   uuid references public.job_roles(id) on delete set null,
  readiness_score  numeric(5,2) default 0,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- ── 6. user_skills (Skill yang Dimiliki User) ─────────────────
create table public.user_skills (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  skill_id   uuid not null references public.skills(id) on delete cascade,
  created_at timestamptz default now(),
  unique (user_id, skill_id)
);

-- ── 7. user_progress (Tracking Belajar) ──────────────────────
create table public.user_progress (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  skill_id     uuid not null references public.skills(id) on delete cascade,
  status       text not null default 'learning', -- 'learning' | 'completed'
  completed_at timestamptz,
  created_at   timestamptz default now(),
  unique (user_id, skill_id)
);

-- ── 8. roadmaps (Cache AI Roadmap) ───────────────────────────
create table public.roadmaps (
  id             uuid primary key default uuid_generate_v4(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  target_role_id uuid references public.job_roles(id) on delete set null,
  content        jsonb,   -- hasil dari Gemini
  gap_skills     jsonb,   -- snapshot skill gap saat generate
  status         text not null default 'belum selesai'
                 check (status in ('selesai', 'belum selesai', 'berjalan')),
  created_at     timestamptz default now()
);

-- ── 9. skill_resources (Learning Resources) ──────────────────
-- Tabel untuk menyimpan link referensi belajar per skill
create table public.skill_resources (
  id uuid default gen_random_uuid() primary key,
  skill_id uuid references public.skills(id) on delete cascade,
  title text not null,
  url text not null,
  type text not null, -- 'video' atau 'article'
  platform text,
  created_at timestamptz default now()
);

-- ── 10. roadmap_phase_progress (Status per fase roadmap) ─────
-- Tabel untuk menyimpan progress/status setiap fase roadmap user
create table public.roadmap_phase_progress (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  roadmap_id  uuid not null references public.roadmaps(id) on delete cascade,
  phase       int not null,  -- nomor fase (1, 2, 3, dst)
  status      text not null default 'belum' check (status in ('belum', 'berjalan', 'selesai')),
  started_at  timestamptz,
  completed_at timestamptz,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now(),
  unique (user_id, roadmap_id, phase)
);

-- Index untuk query cepat
create index idx_roadmap_phase_progress_user_roadmap 
  on public.roadmap_phase_progress(user_id, roadmap_id);

-- Function untuk auto-update updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_roadmap_phase_progress_updated_at
  before update on public.roadmap_phase_progress
  for each row
  execute function update_updated_at_column();

-- ============================================================
-- Row Level Security (RLS)
-- User hanya bisa baca/tulis data miliknya sendiri
-- ============================================================

-- Master data (job_roles, skills, job_role_skills) bisa dibaca siapa saja
alter table public.job_roles enable row level security;
alter table public.skills enable row level security;
alter table public.job_role_skills enable row level security;

create policy "Public read job_roles" on public.job_roles for select using (true);
create policy "Public read skills" on public.skills for select using (true);
create policy "Public read job_role_skills" on public.job_role_skills for select using (true);

-- job_requirements: public readable (AI pakai ini untuk konteks)
alter table public.job_requirements enable row level security;
create policy "Public read job_requirements" on public.job_requirements for select using (true);

-- profiles
alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- user_skills
alter table public.user_skills enable row level security;
create policy "Users can manage own skills" on public.user_skills for all using (auth.uid() = user_id);

-- user_progress
alter table public.user_progress enable row level security;
create policy "Users can manage own progress" on public.user_progress for all using (auth.uid() = user_id);

-- roadmaps
alter table public.roadmaps enable row level security;
create policy "Users can manage own roadmaps" on public.roadmaps for all using (auth.uid() = user_id);

-- skill_resources: public readable
alter table public.skill_resources enable row level security;
create policy "Public read skill_resources" on public.skill_resources for select using (true);

-- roadmap_phase_progress
alter table public.roadmap_phase_progress enable row level security;
create policy "Users can manage own phase progress" on public.roadmap_phase_progress for all using (auth.uid() = user_id);
