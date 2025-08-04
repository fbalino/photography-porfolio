-- Create the photos table
CREATE TABLE photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('portraits', 'landscapes', 'street', 'abstract')),
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for faster category filtering
CREATE INDEX idx_photos_category ON photos(category);

-- Create an index for sorting by creation date
CREATE INDEX idx_photos_created_at ON photos(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows public read access
CREATE POLICY "Allow public read access" ON photos
  FOR SELECT USING (true);

-- Create a policy that allows public insert (for testing)
CREATE POLICY "Allow public insert" ON photos
  FOR INSERT WITH CHECK (true);

-- Create a policy that allows public update
CREATE POLICY "Allow public update" ON photos
  FOR UPDATE USING (true);

-- Create a policy that allows public delete
CREATE POLICY "Allow public delete" ON photos
  FOR DELETE USING (true); 