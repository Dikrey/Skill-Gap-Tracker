import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('='.repeat(70));
console.log('DATASET VALIDATION');
console.log('='.repeat(70));
console.log();

let hasError = false;

// ============================================================
// Load all dataset files
// ============================================================
const datasetPath = path.join(__dirname, '../../../dataset');

const jobRoles = JSON.parse(fs.readFileSync(path.join(datasetPath, 'job_roles.json'), 'utf8'));
const skills = JSON.parse(fs.readFileSync(path.join(datasetPath, 'skills.json'), 'utf8'));
const jobRoleSkills = JSON.parse(fs.readFileSync(path.join(datasetPath, 'job_role_skills.json'), 'utf8'));
const resources = JSON.parse(fs.readFileSync(path.join(datasetPath, 'resources.json'), 'utf8'));

console.log('📊 Dataset Statistics:');
console.log(`   Job Roles: ${jobRoles.length}`);
console.log(`   Skills: ${skills.length}`);
console.log(`   Role-Skill Mappings: ${jobRoleSkills.length}`);
console.log(`   Resources: ${resources.length}`);
console.log();

// ============================================================
// 1. Validate job_roles.json structure
// ============================================================
console.log('1️⃣  Validating job_roles.json structure...');

const validRoleFields = ['name', 'description'];
const roleNames = new Set();

jobRoles.forEach((role, index) => {
    // Check required fields
    if (!role.name) {
        console.error(`   ❌ Entry ${index}: Missing 'name' field`);
        hasError = true;
    }
    
    // Check for extra fields
    const extraFields = Object.keys(role).filter(k => !validRoleFields.includes(k));
    if (extraFields.length > 0) {
        console.error(`   ❌ Entry ${index} (${role.name}): Extra fields: ${extraFields.join(', ')}`);
        hasError = true;
    }
    
    // Check for duplicates
    if (roleNames.has(role.name)) {
        console.error(`   ❌ Duplicate role name: "${role.name}"`);
        hasError = true;
    }
    roleNames.add(role.name);
});

if (!hasError) {
    console.log('   ✅ All job roles valid');
}
console.log();

// ============================================================
// 2. Validate skills.json structure
// ============================================================
console.log('2️⃣  Validating skills.json structure...');

const validSkillFields = ['name', 'category'];
const validCategories = ['programming', 'tools', 'knowledge', 'design', 'soft_skill', 'general'];
const skillNames = new Set();

skills.forEach((skill, index) => {
    // Check required fields
    if (!skill.name) {
        console.error(`   ❌ Entry ${index}: Missing 'name' field`);
        hasError = true;
    }
    
    if (!skill.category) {
        console.error(`   ❌ Entry ${index} (${skill.name}): Missing 'category' field`);
        hasError = true;
    }
    
    // Check category validity
    if (skill.category && !validCategories.includes(skill.category)) {
        console.error(`   ❌ Entry ${index} (${skill.name}): Invalid category "${skill.category}". Valid: ${validCategories.join(', ')}`);
        hasError = true;
    }
    
    // Check for extra fields
    const extraFields = Object.keys(skill).filter(k => !validSkillFields.includes(k));
    if (extraFields.length > 0) {
        console.error(`   ❌ Entry ${index} (${skill.name}): Extra fields: ${extraFields.join(', ')}`);
        hasError = true;
    }
    
    // Check for duplicates
    if (skillNames.has(skill.name)) {
        console.error(`   ❌ Duplicate skill name: "${skill.name}"`);
        hasError = true;
    }
    skillNames.add(skill.name);
});

if (!hasError) {
    console.log('   ✅ All skills valid');
}
console.log();

// ============================================================
// 3. Validate job_role_skills.json structure
// ============================================================
console.log('3️⃣  Validating job_role_skills.json structure...');

const validMappingFields = ['role_name', 'skill_name', 'importance'];
const validImportance = ['required', 'nice_to_have'];
const mappingKeys = new Set();

jobRoleSkills.forEach((mapping, index) => {
    // Check required fields
    if (!mapping.role_name) {
        console.error(`   ❌ Entry ${index}: Missing 'role_name' field`);
        hasError = true;
    }
    
    if (!mapping.skill_name) {
        console.error(`   ❌ Entry ${index}: Missing 'skill_name' field`);
        hasError = true;
    }
    
    if (!mapping.importance) {
        console.error(`   ❌ Entry ${index}: Missing 'importance' field`);
        hasError = true;
    }
    
    // Check importance validity
    if (mapping.importance && !validImportance.includes(mapping.importance)) {
        console.error(`   ❌ Entry ${index}: Invalid importance "${mapping.importance}". Valid: ${validImportance.join(', ')}`);
        hasError = true;
    }
    
    // Check for extra fields
    const extraFields = Object.keys(mapping).filter(k => !validMappingFields.includes(k));
    if (extraFields.length > 0) {
        console.error(`   ❌ Entry ${index}: Extra fields: ${extraFields.join(', ')}`);
        hasError = true;
    }
    
    // Check if role exists
    if (mapping.role_name && !roleNames.has(mapping.role_name)) {
        console.error(`   ❌ Entry ${index}: Role "${mapping.role_name}" not found in job_roles.json`);
        hasError = true;
    }
    
    // Check if skill exists
    if (mapping.skill_name && !skillNames.has(mapping.skill_name)) {
        console.error(`   ❌ Entry ${index}: Skill "${mapping.skill_name}" not found in skills.json`);
        hasError = true;
    }
    
    // Check for duplicate mappings
    const key = `${mapping.role_name}|${mapping.skill_name}`;
    if (mappingKeys.has(key)) {
        console.error(`   ❌ Duplicate mapping: ${mapping.role_name} → ${mapping.skill_name}`);
        hasError = true;
    }
    mappingKeys.add(key);
});

if (!hasError) {
    console.log('   ✅ All mappings valid');
}
console.log();

// ============================================================
// 4. Validate resources.json structure
// ============================================================
console.log('4️⃣  Validating resources.json structure...');

const validResourceFields = ['skill_name', 'resources'];
const validResourceItemFields = ['title', 'type', 'url', 'platform'];
const validResourceTypes = ['video', 'article'];

resources.forEach((resource, index) => {
    // Check required fields
    if (!resource.skill_name) {
        console.error(`   ❌ Entry ${index}: Missing 'skill_name' field`);
        hasError = true;
    }
    
    if (!resource.resources || !Array.isArray(resource.resources)) {
        console.error(`   ❌ Entry ${index}: Missing or invalid 'resources' array`);
        hasError = true;
    }
    
    // Check for extra fields
    const extraFields = Object.keys(resource).filter(k => !validResourceFields.includes(k));
    if (extraFields.length > 0) {
        console.error(`   ❌ Entry ${index}: Extra fields: ${extraFields.join(', ')}`);
        hasError = true;
    }
    
    // Check if skill exists
    if (resource.skill_name && !skillNames.has(resource.skill_name)) {
        console.error(`   ❌ Entry ${index}: Skill "${resource.skill_name}" not found in skills.json`);
        hasError = true;
    }
    
    // Validate each resource item
    if (resource.resources && Array.isArray(resource.resources)) {
        resource.resources.forEach((item, itemIndex) => {
            if (!item.title) {
                console.error(`   ❌ Entry ${index}, Resource ${itemIndex}: Missing 'title'`);
                hasError = true;
            }
            
            if (!item.type) {
                console.error(`   ❌ Entry ${index}, Resource ${itemIndex}: Missing 'type'`);
                hasError = true;
            }
            
            if (item.type && !validResourceTypes.includes(item.type)) {
                console.error(`   ❌ Entry ${index}, Resource ${itemIndex}: Invalid type "${item.type}". Valid: ${validResourceTypes.join(', ')}`);
                hasError = true;
            }
            
            if (!item.url) {
                console.error(`   ❌ Entry ${index}, Resource ${itemIndex}: Missing 'url'`);
                hasError = true;
            }
            
            if (!item.platform) {
                console.error(`   ❌ Entry ${index}, Resource ${itemIndex}: Missing 'platform'`);
                hasError = true;
            }
            
            // Check for extra fields
            const extraItemFields = Object.keys(item).filter(k => !validResourceItemFields.includes(k));
            if (extraItemFields.length > 0) {
                console.error(`   ❌ Entry ${index}, Resource ${itemIndex}: Extra fields: ${extraItemFields.join(', ')}`);
                hasError = true;
            }
        });
    }
});

if (!hasError) {
    console.log('   ✅ All resources valid');
}
console.log();

// ============================================================
// 5. Coverage Analysis
// ============================================================
console.log('5️⃣  Coverage Analysis...');

// Roles without skills
const rolesWithSkills = new Set(jobRoleSkills.map(m => m.role_name));
const rolesWithoutSkills = [...roleNames].filter(r => !rolesWithSkills.has(r));

if (rolesWithoutSkills.length > 0) {
    console.log(`   ⚠️  ${rolesWithoutSkills.length} roles without skills:`);
    rolesWithoutSkills.slice(0, 5).forEach(r => console.log(`      - ${r}`));
    if (rolesWithoutSkills.length > 5) {
        console.log(`      ... and ${rolesWithoutSkills.length - 5} more`);
    }
} else {
    console.log('   ✅ All roles have skills');
}

// Skills without resources
const skillsWithResources = new Set(resources.map(r => r.skill_name));
const skillsWithoutResources = [...skillNames].filter(s => !skillsWithResources.has(s));

if (skillsWithoutResources.length > 0) {
    console.log(`   ⚠️  ${skillsWithoutResources.length} skills without resources (will be added by enhancement scripts)`);
} else {
    console.log('   ✅ All skills have resources');
}

console.log();

// ============================================================
// Final Result
// ============================================================
console.log('='.repeat(70));
if (hasError) {
    console.log('❌ VALIDATION FAILED - Please fix errors above');
    console.log('='.repeat(70));
    process.exit(1);
} else {
    console.log('✅ VALIDATION PASSED - All dataset files are consistent!');
    console.log('='.repeat(70));
    process.exit(0);
}
