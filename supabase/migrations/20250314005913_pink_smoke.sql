/*
  # Create consultations table

  1. New Tables
    - `consultations`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `company` (text)
      - `message` (text)
      - `service_area` (text)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `consultations` table
    - Add policy for inserting new consultation requests
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

-- Create policy to allow anonymous users to insert consultations
CREATE POLICY "Allow anonymous consultation submissions" ON consultations
  FOR INSERT
  TO anon
  WITH CHECK (true);