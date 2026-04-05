import supabase from '../services/supabaseClient.js';
import fs from 'fs';
import path from 'path';

async function test() {
    const { data, error } = await supabase.from('skill_resources').select('*').limit(3);
    console.log('Sample Data (DB Check):', JSON.stringify({ data, error }, null, 2));
}

test();
