import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { searchSimilarRequirements } from './vectorSearch.js';
import supabase from './supabaseClient.js';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate roadmap belajar dengan RAG:
 * 1. Retrieve job requirements yang relevan via pgvector similarity search
 * 2. Inject sebagai context ke prompt Gemini
 * 3. Gemini generate roadmap berdasarkan data nyata dari market
 *
 * @param {string} targetRole - Nama role target (contoh: "Frontend Developer")
 * @param {string} targetRoleId - UUID role target (untuk vector search)
 * @param {Array} gapSkills - Array of { name, category } yang perlu dipelajari
 * @returns {Object} roadmap dari Gemini dalam format JSON
 */
export const generateRoadmap = async (targetRole, targetRoleId, gapSkills, currentPosition = 'tidak diketahui') => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const skillList = gapSkills.map((s) => `- ${s.name}`).join('\n');

  // ── Step 1: RAG — Retrieve relevant job requirements ─────────────────────
  let ragContext = '';
  try {
    const queryText = `${targetRole} skill requirements: ${gapSkills.map((s) => s.name).join(', ')}`;
    const similarDocs = await searchSimilarRequirements(queryText, targetRoleId, 5, 0.4);

    if (similarDocs.length > 0) {
      const contextSnippets = similarDocs
        .map(
          (doc, i) =>
            `[Job Posting ${i + 1}] ${doc.title} (Source: ${doc.source}, Similarity: ${(doc.similarity * 100).toFixed(0)}%)\n${doc.content}`
        )
        .join('\n\n---\n\n');

      ragContext = `
## Referensi Job Requirements dari Pasar Kerja Aktual
Berikut adalah contoh job posting nyata untuk posisi ${targetRole} yang telah dikumpulkan dari berbagai platform:

${contextSnippets}

---
`;
    }
  } catch (err) {
    // Jika RAG gagal, tetap lanjut tanpa context (graceful degradation)
    console.warn('[RAG] Vector search failed, generating without context:', err.message);
  }

  // ── Step 1.5: Fetch valid URLs from DB ─────────────────────────────────
  const skillIds = gapSkills.map((s) => s.id);
  const resourceCatalog = {};

  try {
    if (skillIds.length > 0) {
      // Build an id->name map from the gapSkills array
      const idToName = {};
      gapSkills.forEach(s => { idToName[s.id] = s.name; });

      const { data: resources } = await supabase
        .from('skill_resources')
        .select('skill_id, title, type, url, platform')
        .in('skill_id', skillIds);

      if (resources && resources.length > 0) {
        resources.forEach(r => {
          const sName = idToName[r.skill_id];
          if (sName) {
            if (!resourceCatalog[sName]) resourceCatalog[sName] = [];
            resourceCatalog[sName].push({
              title: r.title,
              type: r.type,
              url: r.url,
              platform: r.platform
            });
          }
        });
      }
    }
  } catch (err) {
    console.warn('[DB] Failed to load curated resources:', err.message);
  }

  // ── Step 2: Build prompt dengan RAG context ──────────────────────────────
  const prompt = `
Kamu adalah career advisor yang ahli di bidang teknologi dan pengembangan karir.

${ragContext}

User saat ini berstatus sebagai **${currentPosition}** dan ingin menjadi **${targetRole}**. Skill gap yang perlu dipelajari:
${skillList}

Berdasarkan referensi job requirements di atas (jika ada) dan pengetahuanmu, buatkan roadmap belajar yang terstruktur dan realistis dalam format JSON:

{
  "summary": "Ringkasan roadmap dalam 2-3 kalimat, sebutkan insight dari job market",
  "estimatedDuration": "estimasi total waktu belajar",
  "marketInsight": "1-2 kalimat tentang trend/demand skill ini di pasar kerja",
  "phases": [
    {
      "phase": 1,
      "title": "Judul fase",
      "duration": "estimasi durasi fase ini",
      "focus_skills": ["Nama Skill Persis dari Daftar Gap"],
      "sub_topics": ["Sub-topik 1", "Sub-topik 2 (misal: Variabel, dll)"]
    }
  ]
}

Pastikan:
- Urutkan dari skill fundamental ke advanced.
- "focus_skills" HANYA BOLEH diisi dengan satu atau lebih NAMA SKILL TEPAT SEPERTI YANG ADA DI DAFTAR GAP (jangan diubah atau dipecah namanya).
- Jangan sertakan field "resources" sama sekali. Backend kami akan mengurus datanya.
- "sub_topics" silakan diisi dengan breakdown materi yang detail.
- Field "marketInsight" wajib diisi berdasarkan insight job posting yang relevan.
- Jawab HANYA dengan JSON valid, tanpa teks tambahan.
`;

  // ── Step 3: Generate dengan Gemini ───────────────────────────────────────
  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Clean markdown code block jika ada
  const cleanJson = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

  try {
    const parsedObj = JSON.parse(cleanJson);

    // Helper: fuzzy match nama skill (Gemini sering rename/group skill dari daftar)
    const findResourcesForSkill = (geminiSkillName, catalog) => {
      if (catalog[geminiSkillName]) return catalog[geminiSkillName];
      const norm = geminiSkillName.toLowerCase();
      for (const [key, res] of Object.entries(catalog)) {
        if (norm.includes(key.toLowerCase()) || key.toLowerCase().includes(norm)) return res;
      }
      return null;
    };

    // Inject programmatic resources dengan fuzzy matching
    if (parsedObj.phases && Array.isArray(parsedObj.phases)) {
      parsedObj.phases.forEach(phase => {
        phase.resources = [];
        if (phase.focus_skills && Array.isArray(phase.focus_skills)) {
          phase.focus_skills.forEach(skillName => {
            const matched = findResourcesForSkill(skillName, resourceCatalog);
            if (matched) phase.resources.push(...matched);
          });
        }
      });
    }

    return parsedObj;
  } catch (e) {
    console.error("Failed to parse Gemini output:", e);
    return { raw: text, parseError: true };
  }
};
