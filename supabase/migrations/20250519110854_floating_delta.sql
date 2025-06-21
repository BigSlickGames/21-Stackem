/*
  # Add difficulty level to leaderboard

  1. Changes
    - Add `difficulty` column to `leaderboard` table
    - Add index on `difficulty` and `score` for faster leaderboard queries
    - Update RLS policies to maintain existing permissions
*/

ALTER TABLE leaderboard 
ADD COLUMN difficulty text NOT NULL DEFAULT 'medium';

CREATE INDEX leaderboard_difficulty_score_idx ON leaderboard(difficulty, score DESC);

-- Update RLS policies to maintain existing permissions
DROP POLICY IF EXISTS "Anyone can read leaderboard" ON leaderboard;
DROP POLICY IF EXISTS "Anyone can submit scores" ON leaderboard;

CREATE POLICY "Anyone can read leaderboard"
ON leaderboard
FOR SELECT
TO public
USING (true);

CREATE POLICY "Anyone can submit scores"
ON leaderboard
FOR INSERT
TO public
WITH CHECK (true);