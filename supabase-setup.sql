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

-- Create a policy that allows authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON photos
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create a policy that allows authenticated users to update
CREATE POLICY "Allow authenticated update" ON photos
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create a policy that allows authenticated users to delete
CREATE POLICY "Allow authenticated delete" ON photos
  FOR DELETE USING (auth.role() = 'authenticated'); 