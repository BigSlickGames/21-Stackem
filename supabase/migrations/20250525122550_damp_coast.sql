/*
  # Create leaderboard table with policies

  1. New Tables
    - `leaderboard` table with score tracking
    - Index on difficulty and score for faster queries
  
  2. Security
    - Enable RLS
    - Policies for reading and submitting scores
*/

CREATE TABLE IF NOT EXISTS leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  score integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  difficulty text NOT NULL DEFAULT 'medium'
);

-- Enable Row Level Security
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Create index for faster leaderboard queries if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'leaderboard_difficulty_score_idx'
  ) THEN
    CREATE INDEX leaderboard_difficulty_score_idx ON leaderboard(difficulty, score DESC);
  END IF;
END $$;

-- Drop existing policies if they exist
DO $$
BEGIN
  DROP POLICY IF EXISTS "Anyone can read leaderboard" ON leaderboard;
  DROP POLICY IF EXISTS "Anyone can submit scores" ON leaderboard;
END $$;

-- Allow anyone to read leaderboard entries
CREATE POLICY "Anyone can read leaderboard"
  ON leaderboard
  FOR SELECT
  TO public
  USING (true);

-- Allow anyone to submit new scores
CREATE POLICY "Anyone can submit scores"
  ON leaderboard
  FOR INSERT
  TO public
  WITH CHECK (true);