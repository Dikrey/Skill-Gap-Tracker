-- ============================================================
-- Seed: Master Data (job_roles + skills + job_role_skills)
-- Jalankan di Supabase SQL Editor sebelum npm run seed
-- ============================================================

-- ── Insert job_roles ──────────────────────────────────────────
insert into public.job_roles (name, description) values
  ('Frontend Developer', 'Membangun antarmuka pengguna berbasis web menggunakan HTML, CSS, JavaScript, dan framework modern seperti React atau Next.js.'),
  ('Backend Developer', 'Membangun dan mengelola server, database, dan API yang mendukung aplikasi web dan mobile.'),
  ('Data Analyst', 'Mengumpulkan, membersihkan, dan menganalisis data untuk menghasilkan insight bisnis yang berharga.'),
  ('UI/UX Designer', 'Merancang tampilan dan pengalaman pengguna yang intuitif, menarik, dan sesuai kebutuhan pengguna.'),
  ('Digital Marketing', 'Merencanakan dan menjalankan strategi pemasaran digital melalui berbagai platform online.')
on conflict (name) do nothing;

-- ── Insert skills ─────────────────────────────────────────────
insert into public.skills (name, category) values
  ('HTML', 'programming'),
  ('CSS', 'programming'),
  ('JavaScript', 'programming'),
  ('React.js', 'programming'),
  ('Next.js', 'programming'),
  ('TypeScript', 'programming'),
  ('Tailwind CSS', 'tools'),
  ('Git', 'tools'),
  ('REST API', 'programming'),
  ('Node.js', 'programming'),
  ('Express.js', 'programming'),
  ('SQL', 'programming'),
  ('PostgreSQL', 'tools'),
  ('Docker', 'tools'),
  ('Authentication & JWT', 'programming'),
  ('Python', 'programming'),
  ('Pandas', 'programming'),
  ('Excel', 'tools'),
  ('Data Visualization', 'tools'),
  ('Statistik Dasar', 'knowledge'),
  ('Tableau / Power BI', 'tools'),
  ('Figma', 'tools'),
  ('User Research', 'knowledge'),
  ('Wireframing', 'knowledge'),
  ('Prototyping', 'knowledge'),
  ('Design System', 'knowledge'),
  ('SEO', 'knowledge'),
  ('Google Analytics', 'tools'),
  ('Social Media Marketing', 'knowledge'),
  ('Content Writing', 'knowledge'),
  ('Meta Ads / Google Ads', 'tools')
on conflict (name) do nothing;

-- ── Insert job_role_skills ────────────────────────────────────
-- Frontend Developer
insert into public.job_role_skills (job_role_id, skill_id, importance)
select r.id, s.id, 'required' from public.job_roles r, public.skills s
where r.name = 'Frontend Developer' and s.name in ('HTML','CSS','JavaScript','React.js','Git','REST API')
on conflict do nothing;

insert into public.job_role_skills (job_role_id, skill_id, importance)
select r.id, s.id, 'nice_to_have' from public.job_roles r, public.skills s
where r.name = 'Frontend Developer' and s.name in ('Next.js','TypeScript','Tailwind CSS')
on conflict do nothing;

-- Backend Developer
insert into public.job_role_skills (job_role_id, skill_id, importance)
select r.id, s.id, 'required' from public.job_roles r, public.skills s
where r.name = 'Backend Developer' and s.name in ('Node.js','Express.js','SQL','PostgreSQL','Git','REST API','Authentication & JWT')
on conflict do nothing;

insert into public.job_role_skills (job_role_id, skill_id, importance)
select r.id, s.id, 'nice_to_have' from public.job_roles r, public.skills s
where r.name = 'Backend Developer' and s.name in ('Docker','TypeScript','JavaScript')
on conflict do nothing;

-- Data Analyst
insert into public.job_role_skills (job_role_id, skill_id, importance)
select r.id, s.id, 'required' from public.job_roles r, public.skills s
where r.name = 'Data Analyst' and s.name in ('SQL','Python','Pandas','Excel','Data Visualization','Statistik Dasar')
on conflict do nothing;

insert into public.job_role_skills (job_role_id, skill_id, importance)
select r.id, s.id, 'nice_to_have' from public.job_roles r, public.skills s
where r.name = 'Data Analyst' and s.name in ('Tableau / Power BI')
on conflict do nothing;

-- UI/UX Designer
insert into public.job_role_skills (job_role_id, skill_id, importance)
select r.id, s.id, 'required' from public.job_roles r, public.skills s
where r.name = 'UI/UX Designer' and s.name in ('Figma','User Research','Wireframing','Prototyping')
on conflict do nothing;

insert into public.job_role_skills (job_role_id, skill_id, importance)
select r.id, s.id, 'nice_to_have' from public.job_roles r, public.skills s
where r.name = 'UI/UX Designer' and s.name in ('Design System')
on conflict do nothing;

-- Digital Marketing
insert into public.job_role_skills (job_role_id, skill_id, importance)
select r.id, s.id, 'required' from public.job_roles r, public.skills s
where r.name = 'Digital Marketing' and s.name in ('SEO','Google Analytics','Social Media Marketing','Content Writing')
on conflict do nothing;

insert into public.job_role_skills (job_role_id, skill_id, importance)
select r.id, s.id, 'nice_to_have' from public.job_roles r, public.skills s
where r.name = 'Digital Marketing' and s.name in ('Meta Ads / Google Ads')
on conflict do nothing;
