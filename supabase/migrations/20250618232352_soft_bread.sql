/*
  # Create Posts table for blog functionality

  1. New Tables
    - `Posts`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `content_markdown` (text, required)
      - `excerpt` (text, required)
      - `featured_image_url` (text, required)
      - `category_ids` (text, required)
      - `tags` (text)
      - `slug` (text, unique)
      - `is_published` (boolean, default true)
      - `published_at` (timestamp with time zone)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `Posts` table
    - Add policy for public read access to published posts
    - Add policy for authenticated users to manage posts
*/

CREATE TABLE IF NOT EXISTS "Posts" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content_markdown text NOT NULL,
  excerpt text NOT NULL,
  featured_image_url text NOT NULL,
  category_ids text NOT NULL DEFAULT 'AI Technology',
  tags text DEFAULT '',
  slug text UNIQUE NOT NULL,
  is_published boolean DEFAULT true,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE "Posts" ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to published posts
CREATE POLICY "Enable read access for published posts" ON "Posts"
  FOR SELECT
  TO public
  USING (is_published = true);

-- Create policy to allow authenticated users to manage posts
CREATE POLICY "Enable full access for authenticated users" ON "Posts"
  FOR ALL
  TO authenticated
  USING (true);

-- Create policy to allow service role to manage posts (for edge functions)
CREATE POLICY "Enable full access for service role" ON "Posts"
  FOR ALL
  TO service_role
  USING (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON "Posts" (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON "Posts" (slug);
CREATE INDEX IF NOT EXISTS idx_posts_category ON "Posts" (category_ids);