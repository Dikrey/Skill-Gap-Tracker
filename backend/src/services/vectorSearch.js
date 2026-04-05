import supabase from './supabaseClient.js';
import { embedText } from './embeddingService.js';

/**
 * Cari job requirements yang paling relevan menggunakan vector similarity search.
 *
 * @param {string} queryText - Teks query (biasanya gabungan target role + gap skills)
 * @param {string} jobRoleId - UUID job role yang dituju
 * @param {number} matchCount - Jumlah hasil yang diambil (default: 5)
 * @param {number} threshold - Minimum similarity score 0-1 (default: 0.5)
 * @returns {Array} Array of job requirement snippets yang paling relevan
 */
export const searchSimilarRequirements = async (
    queryText,
    jobRoleId,
    matchCount = 5,
    threshold = 0.5
) => {
    // Step 1: embed query text
    const queryEmbedding = await embedText(queryText, 'RETRIEVAL_QUERY');

    // Step 2: panggil SQL function match_job_requirements via RPC
    const { data, error } = await supabase.rpc('match_job_requirements', {
        query_embedding: queryEmbedding,
        match_role_id: jobRoleId,
        match_threshold: threshold,
        match_count: matchCount,
    });

    if (error) throw error;

    return data || [];
};
