/*
  # Create leaderboard table

  1. New Tables
    - `leaderboard`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `score` (integer, not null)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `leaderboard` table
    - Add policies for:
      - Anyone can read leaderboard entries
      - Anyone can insert new scores
*/

CREATE TABLE IF NOT EXISTS leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  score integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

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