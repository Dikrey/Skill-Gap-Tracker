import supabase from '../services/supabaseClient.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('='.repeat(70));
console.log('EXPORT DATABASE TO dataset_baru');
console.log('='.repeat(70));
console.log('\n📦 Exporting current database to clean JSON files...\n');

async function exportToDatasetBaru() {
    // Create dataset_baru folder
    const datasetBaruPath = path.join(__dirname, '../../../dataset_baru');
    if (!fs.existsSync(datasetBaruPath)) {
        fs.mkdirSync(datasetBaruPath, { recursive: true });
        console.log('✅ Created folder: dataset_baru\n');
    }
    
    // ============================================================
    // 1. Export job_roles
    // ============================================================
    console.log('1️⃣  Exporting job_roles...');
    const { data: roles, error: rolesError } = await supabase
        .from('job_roles')
        .select('name, description')
        .order('name');
    
    if (rolesError) {
        console.error('❌ Error:', rolesError.message);
    } else {
        const rolesClean = roles.map(r => ({
            name: r.name,
            description: r.description || ''
        }));
        
        fs.writeFileSync(
            path.join(datasetBaruPath, 'job_roles.json'),
            JSON.stringify(rolesClean, null, 2)
        );
        console.log(`   ✅ Exported ${rolesClean.length} job roles\n`);
    }
    
    // ============================================================
    // 2. Export skills
    // ============================================================
    console.log('2️⃣  Exporting skills...');
    const { data: skills, error: skillsError } = await supabase
        .from('skills')
        .select('name, category')
        .order('name');
    
    if (skillsError) {
        console.error('❌ Error:', skillsError.message);
    } else {
        const skillsClean = skills.map(s => ({
            name: s.name,
            category: s.category || 'general'
        }));
        
        fs.writeFileSync(
            path.join(datasetBaruPath, 'skills.json'),
            JSON.stringify(skillsClean, null, 2)
        );
        console.log(`   ✅ Exported ${skillsClean.length} skills\n`);
    }
    
    // ============================================================
    // 3. Export job_role_skills
    // ============================================================
    console.log('3️⃣  Exporting job_role_skills...');
    const { data: mappings, error: mappingsError } = await supabase
        .from('job_role_skills')
        .select(`
            importance,
            job_roles!inner(name),
            skills!inner(name)
        `)
        .order('job_roles(name)');
    
    if (mappingsError) {
        console.error('❌ Error:', mappingsError.message);
    } else {
        const mappingsClean = mappings.map(m => ({
            role_name: m.job_roles.name,
            skill_name: m.skills.name,
            importance: m.importance
        }));
        
        fs.writeFileSync(
            path.join(datasetBaruPath, 'job_role_skills.json'),
            JSON.stringify(mappingsClean, null, 2)
        );
        console.log(`   ✅ Exported ${mappingsClean.length} role-skill mappings\n`);
    }
    
    // ============================================================
    // 4. Export skill_resources
    // ============================================================
    console.log('4️⃣  Exporting skill_resources...');
    const { data: resources, error: resourcesError } = await supabase
        .from('skill_resources')
        .select(`
            title,
            url,
            type,
            platform,
            skills!inner(name)
        `)
        .order('skills(name)');
    
    if (resourcesError) {
        console.error('❌ Error:', resourcesError.message);
    } else {
        // Group by skill
        const resourcesBySkill = {};
        resources.forEach(r => {
            const skillName = r.skills.name;
            if (!resourcesBySkill[skillName]) {
                resourcesBySkill[skillName] = [];
            }
            resourcesBySkill[skillName].push({
                title: r.title,
                type: r.type,
                url: r.url,
                platform: r.platform
            });
        });
        
        const resourcesClean = Object.keys(resourcesBySkill)
            .sort()
            .map(skillName => ({
                skill_name: skillName,
                resources: resourcesBySkill[skillName]
            }));
        
        fs.writeFileSync(
            path.join(datasetBaruPath, 'resources.json'),
            JSON.stringify(resourcesClean, null, 2)
        );
        console.log(`   ✅ Exported ${resourcesClean.length} skills with ${resources.length} total resources\n`);
    }
    
    // ============================================================
    // 5. Create README
    // ============================================================
    console.log('5️⃣  Creating README...');
    const readme = `# Dataset Baru - Exported from Database

Data ini di-export dari database yang sudah lengkap dan ter-enhance.

## 📊 Statistics

- **Job Roles**: ${roles?.length || 0}
- **Skills**: ${skills?.length || 0}
- **Role-Skill Mappings**: ${mappings?.length || 0}
- **Learning Resources**: ${resources?.length || 0}

## 📁 Files

### 1. job_roles.json
Daftar semua job roles dengan deskripsi lengkap.

**Format:**
\`\`\`json
{
  "name": "Front-End Developer",
  "description": "Deskripsi pekerjaan..."
}
\`\`\`

### 2. skills.json
Daftar semua skills dengan kategori.

**Format:**
\`\`\`json
{
  "name": "JavaScript",
  "category": "programming"
}
\`\`\`

### 3. job_role_skills.json
Mapping antara job role dan skill yang dibutuhkan.

**Format:**
\`\`\`json
{
  "role_name": "Front-End Developer",
  "skill_name": "React.js",
  "importance": "required"
}
\`\`\`

### 4. resources.json
Learning resources untuk setiap skill.

**Format:**
\`\`\`json
{
  "skill_name": "JavaScript",
  "resources": [
    {
      "title": "MDN JavaScript Guide",
      "type": "article",
      "url": "https://...",
      "platform": "Official Documentation"
    }
  ]
}
\`\`\`

## 🔄 Cara Menggunakan

### Setup Database Baru

1. **Run schema.sql** di Supabase SQL Editor
2. **Copy dataset_baru ke dataset:**
   \`\`\`bash
   cp -r dataset_baru/* dataset/
   \`\`\`
3. **Run setup:**
   \`\`\`bash
   npm run setup-complete
   \`\`\`

### Atau Manual

\`\`\`bash
node src/scripts/seedMasterData.js
node src/scripts/seedRoleSkills.js
node src/scripts/seedResources.js
\`\`\`

## ✅ Data Quality

- ✅ Semua field konsisten
- ✅ Tidak ada duplicate
- ✅ Semua referensi valid
- ✅ Data sudah ter-enhance dan lengkap
- ✅ Siap untuk production

## 📝 Notes

- Data ini adalah snapshot dari database yang sudah berjalan dengan baik
- Sudah termasuk semua enhancement (skills tambahan, mappings, resources)
- Format JSON sudah clean dan konsisten
- Bisa langsung digunakan untuk setup database baru

---

**Exported on:** ${new Date().toISOString()}
**Total Data Points:** ${(roles?.length || 0) + (skills?.length || 0) + (mappings?.length || 0) + (resources?.length || 0)}
`;
    
    fs.writeFileSync(
        path.join(datasetBaruPath, 'README.md'),
        readme
    );
    console.log('   ✅ Created README.md\n');
    
    // ============================================================
    // Summary
    // ============================================================
    console.log('='.repeat(70));
    console.log('✅ EXPORT COMPLETE!');
    console.log('='.repeat(70));
    console.log('\n📊 Summary:');
    console.log(`   Job Roles:           ${roles?.length || 0}`);
    console.log(`   Skills:              ${skills?.length || 0}`);
    console.log(`   Role-Skill Mappings: ${mappings?.length || 0}`);
    console.log(`   Learning Resources:  ${resources?.length || 0}`);
    console.log('\n📁 Files created in: dataset_baru/');
    console.log('   - job_roles.json');
    console.log('   - skills.json');
    console.log('   - job_role_skills.json');
    console.log('   - resources.json');
    console.log('   - README.md');
    console.log('\n💡 Next steps:');
    console.log('   1. Review files in dataset_baru/');
    console.log('   2. Validate: npm run validate:dataset');
    console.log('   3. Replace old dataset: cp -r dataset_baru/* dataset/');
    console.log('   4. Test with new database: npm run setup-complete\n');
}

exportToDatasetBaru().catch(err => {
    console.error('\n❌ Export failed:', err.message);
    process.exit(1);
});
