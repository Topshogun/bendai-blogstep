-- Enable RLS on Posts table
ALTER TABLE "Posts" ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to published posts
CREATE POLICY "Enable read access for all users" ON "Posts"
  FOR SELECT
  TO public
  USING (true);