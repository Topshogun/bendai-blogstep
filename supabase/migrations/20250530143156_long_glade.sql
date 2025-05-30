/*
  # Create consultations table and Posts table policies

  1. Tables
    - `consultations` (existing)
    - `Posts` (update policies)

  2. Security
    - Enable RLS on both tables
    - Add policies for public access to Posts
*/

CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  message text,
  service_area text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous consultation submissions
CREATE POLICY "Allow anonymous consultation submissions" ON consultations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Enable RLS on Posts table
ALTER TABLE "Posts" ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to published posts
CREATE POLICY "Enable read access for all users" ON "Posts"
  FOR SELECT
  TO public
  USING (true);