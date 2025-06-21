import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  created_at: string;
  difficulty: string;
}

export async function submitScore(name: string, score: number, difficulty: string): Promise<void> {
  await supabase
    .from('leaderboard')
    .insert([{ name, score, difficulty }]);
}

export async function getLeaderboard(difficulty: string): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .eq('difficulty', difficulty)
    .order('score', { ascending: false })
    .limit(100);

  if (error) throw error;
  return data || [];
}