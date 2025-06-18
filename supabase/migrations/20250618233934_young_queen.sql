/*
  # Fix Posts table schema and policies

  1. Clean up existing policies
  2. Ensure proper table structure matches database schema
  3. Create proper RLS policies
  4. Add necessary indexes
*/

-- First, check if Posts table exists and get its structure
DO $$
DECLARE
    table_exists boolean;
BEGIN
    SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'Posts'
    ) INTO table_exists;
    
    IF NOT table_exists THEN
        -- Create the table if it doesn't exist
        CREATE TABLE "Posts" (
            id bigint PRIMARY KEY,
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz DEFAULT now(),
            slug text,
            content_markdown text,
            excerpt text,
            featured_image_url text,
            published_at timestamptz DEFAULT now(),
            is_published boolean DEFAULT true,
            category_ids text DEFAULT 'AI Technology',
            tags character varying[],
            title text,
            research_topic text,
            seo_keywords_targeted text[],
            seo_keywords_used text[]
        );
        
        -- Create sequence for auto-incrementing ID
        CREATE SEQUENCE IF NOT EXISTS "Posts_id_seq";
        ALTER TABLE "Posts" ALTER COLUMN id SET DEFAULT nextval('"Posts_id_seq"');
        ALTER SEQUENCE "Posts_id_seq" OWNED BY "Posts".id;
    END IF;
END $$;

-- Drop all existing policies to avoid conflicts
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'Posts'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_record.policyname || '" ON "Posts"';
    END LOOP;
END $$;

-- Ensure RLS is enabled
ALTER TABLE "Posts" ENABLE ROW LEVEL SECURITY;

-- Create new policies with unique names
CREATE POLICY "posts_select_all" ON "Posts"
    FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "posts_insert_service" ON "Posts"
    FOR INSERT
    TO service_role
    WITH CHECK (true);

CREATE POLICY "posts_update_service" ON "Posts"
    FOR UPDATE
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "posts_delete_service" ON "Posts"
    FOR DELETE
    TO service_role
    USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_published_at_desc ON "Posts" (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_slug_unique ON "Posts" (slug);
CREATE INDEX IF NOT EXISTS idx_posts_category_filter ON "Posts" (category_ids);
CREATE INDEX IF NOT EXISTS idx_posts_published_status ON "Posts" (is_published);
CREATE INDEX IF NOT EXISTS idx_posts_created_desc ON "Posts" (created_at DESC);

-- Ensure the sequence is properly set
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.sequences WHERE sequence_name = 'Posts_id_seq') THEN
        PERFORM setval('"Posts_id_seq"', COALESCE((SELECT MAX(id) FROM "Posts"), 0) + 1, false);
    END IF;
END $$;