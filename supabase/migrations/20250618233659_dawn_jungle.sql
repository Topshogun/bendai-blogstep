/*
  # Fix Posts table schema to match existing structure

  1. Schema Updates
    - Ensure Posts table matches the exact schema from the database
    - Fix column types and constraints
    - Update RLS policies for proper access

  2. Security
    - Enable proper RLS policies
    - Allow service role full access for edge functions
    - Allow public read access for published posts
*/

-- First, let's ensure the table structure matches exactly
DO $$
BEGIN
  -- Check if Posts table exists, if not create it
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'Posts') THEN
    CREATE TABLE "Posts" (
      id bigint PRIMARY KEY,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz DEFAULT now(),
      slug text,
      content_markdown text,
      excerpt text,
      featured_image_url text,
      published_at timestamptz DEFAULT '2025-05-29 16:10:13.432144+00'::timestamp with time zone,
      is_published boolean,
      category_ids text DEFAULT 'AI Technology'::text,
      tags character varying[],
      title text,
      research_topic text,
      seo_keywords_targeted text[],
      seo_keywords_used text[]
    );
  END IF;

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

  -- Ensure tags is an array type
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'Posts' AND column_name = 'tags' AND data_type != 'ARRAY'
  ) THEN
    -- Convert existing text tags to array
    ALTER TABLE "Posts" ALTER COLUMN tags TYPE character varying[] 
    USING CASE 
      WHEN tags IS NULL OR tags = '' THEN NULL
      ELSE string_to_array(tags, ',')
    END;
  END IF;
END $$;

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Enable read access for all users" ON "Posts";
DROP POLICY IF EXISTS "Enable read access for published posts" ON "Posts";
DROP POLICY IF EXISTS "Enable full access for authenticated users" ON "Posts";
DROP POLICY IF EXISTS "Enable full access for service role" ON "Posts";
DROP POLICY IF EXISTS "Enable insert for service role" ON "Posts";
DROP POLICY IF EXISTS "Enable update for service role" ON "Posts";
DROP POLICY IF EXISTS "Enable delete for service role" ON "Posts";

-- Enable RLS
ALTER TABLE "Posts" ENABLE ROW LEVEL SECURITY;

-- Create comprehensive RLS policies
CREATE POLICY "Enable read access for all users" ON "Posts"
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Enable all operations for service role" ON "Posts"
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON "Posts" (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON "Posts" (slug);
CREATE INDEX IF NOT EXISTS idx_posts_category ON "Posts" (category_ids);
CREATE INDEX IF NOT EXISTS idx_posts_is_published ON "Posts" (is_published);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON "Posts" (created_at DESC);

-- Create a sequence for the id column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_sequences WHERE sequencename = 'Posts_id_seq') THEN
    CREATE SEQUENCE "Posts_id_seq";
    ALTER TABLE "Posts" ALTER COLUMN id SET DEFAULT nextval('"Posts_id_seq"');
    ALTER SEQUENCE "Posts_id_seq" OWNED BY "Posts".id;
    -- Set the sequence to start from a reasonable number
    SELECT setval('"Posts_id_seq"', COALESCE(MAX(id), 0) + 1, false) FROM "Posts";
  END IF;
END $$;