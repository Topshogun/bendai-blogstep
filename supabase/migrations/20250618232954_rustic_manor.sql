/*
  # Fix Posts table structure and policies

  1. Update Posts table structure
    - Fix column types and constraints
    - Ensure proper defaults
    - Add missing columns

  2. Security
    - Update RLS policies for proper access
    - Allow anonymous and authenticated access for reading
    - Allow service role for full access
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable read access for all users" ON "Posts";
DROP POLICY IF EXISTS "Enable read access for published posts" ON "Posts";
DROP POLICY IF EXISTS "Enable full access for authenticated users" ON "Posts";
DROP POLICY IF EXISTS "Enable full access for service role" ON "Posts";

-- Update the Posts table structure
DO $$
BEGIN
  -- Add missing columns if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'Posts' AND column_name = 'research_topic'
  ) THEN
    ALTER TABLE "Posts" ADD COLUMN research_topic text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'Posts' AND column_name = 'seo_keywords_targeted'
  ) THEN
    ALTER TABLE "Posts" ADD COLUMN seo_keywords_targeted text[];
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'Posts' AND column_name = 'seo_keywords_used'
  ) THEN
    ALTER TABLE "Posts" ADD COLUMN seo_keywords_used text[];
  END IF;

  -- Update existing columns to match the schema
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'Posts' AND column_name = 'tags' AND data_type = 'text'
  ) THEN
    ALTER TABLE "Posts" ALTER COLUMN tags TYPE character varying[] USING string_to_array(tags, ',');
  END IF;

  -- Ensure proper defaults
  ALTER TABLE "Posts" ALTER COLUMN category_ids SET DEFAULT 'AI Technology';
  ALTER TABLE "Posts" ALTER COLUMN published_at SET DEFAULT '2025-05-29 16:10:13.432144+00'::timestamp with time zone;
  ALTER TABLE "Posts" ALTER COLUMN is_published SET DEFAULT true;
END $$;

-- Enable RLS
ALTER TABLE "Posts" ENABLE ROW LEVEL SECURITY;

-- Create comprehensive policies
CREATE POLICY "Enable read access for all users" ON "Posts"
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Enable insert for service role" ON "Posts"
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON "Posts"
  FOR UPDATE
  TO service_role
  USING (true);

CREATE POLICY "Enable delete for service role" ON "Posts"
  FOR DELETE
  TO service_role
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON "Posts" (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON "Posts" (slug);
CREATE INDEX IF NOT EXISTS idx_posts_category ON "Posts" (category_ids);
CREATE INDEX IF NOT EXISTS idx_posts_is_published ON "Posts" (is_published);