# Fernando Balino Photography Portfolio - Project Documentation

## Project Overview
A **fine art photography portfolio** website built with Next.js, designed for high-end collectors, museums, galleries, and buyers of limited edition, large format prints. This is not a commercial photography website - it's for fine art photography that commands thousands of dollars per print.

## Target Audience
- **Museums and galleries** seeking fine art photography
- **High-end collectors** and art buyers
- **Fine art photography enthusiasts**
- **Potential buyers** for limited edition prints
- **High fashion and editorial** clients (secondary market)

## Photography Focus
- **Fine art photography** (not commercial portraits/landscapes)
- **Limited edition prints**
- **Large format photography**
- **High-end, museum-quality work**
- **Editorial and high fashion** (secondary focus)

## Tech Stack
- **Frontend:** Next.js 15.4.5 with TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **File Storage:** Supabase Storage
- **Deployment:** Local development (ready for Vercel deployment)

## Project Structure
```
photography-portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx (Homepage with gallery)
│   │   └── admin/page.tsx (Photo upload interface)
│   ├── components/
│   │   ├── PhotoUpload.tsx (Upload form)
│   │   ├── PhotoList.tsx (Admin photo management)
│   │   └── Lightbox.tsx (Full-screen photo viewer)
│   └── lib/
│       └── supabase.ts (Database connection)
├── .env.local (Supabase credentials)
└── supabase-setup.sql (Database schema)
```

## Key Features Implemented

### 1. Photo Upload System
- **Admin Panel:** `/admin` - Upload photos with title, description, category
- **Categories:** Portraits, Landscapes, Street, Abstract (fine art focused)
- **File Storage:** High-resolution images stored in Supabase cloud storage
- **Database:** Photo metadata stored in PostgreSQL table

### 2. Gallery Display
- **Homepage:** Displays uploaded photos in elegant grid
- **Category Filtering:** Tab-style filter above gallery
- **Responsive Design:** Works on all device sizes
- **Luxury Aesthetic:** Black background, elegant typography, sophisticated design

### 3. Lightbox Functionality
- **Full-Screen Viewing:** Click any photo to open lightbox
- **Navigation:** Arrow keys, click arrows, or click outside to close
- **Photo Info:** Displays title, category, and description
- **Keyboard Support:** Escape to close, arrow keys to navigate

### 4. Database Schema
```sql
CREATE TABLE photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('portraits', 'landscapes', 'street', 'abstract')),
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Supabase Configuration

### Project Details
- **Project URL:** https://gpmxzadpzdbhlpwfgvmz.supabase.co
- **Publishable Key:** sb_publishable_TPNGImrpCak7q5yzI9HSaA_MXir5ein
- **Secret Key:** sb_secret_Q5he6Ww83NnQeYxDFL0YIg_WArosAOX

### Storage Bucket
- **Name:** photos
- **Public:** Yes (allows public access to images)

### Database Policies
- **Public Read Access:** Anyone can view photos
- **Public Upload Access:** Anyone can upload (for testing)
- **Storage Access:** Public uploads and downloads allowed

## Environment Variables (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=https://gpmxzadpzdbhlpwfgvmz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_TPNGImrpCak7q5yzI9HSaA_MXir5ein
SUPABASE_SERVICE_ROLE_KEY=sb_secret_Q5he6Ww83NnQeYxDFL0YIg_WArosAOX
```

## Development Commands

### Start Development Server
```bash
cd ~/Projects/photography-portfolio
npm run dev &
```

### Access URLs
- **Homepage:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin

### Stop Server
```bash
pkill -f "next dev"
```

## Design Decisions

### Aesthetic Choices
- **Color Scheme:** Black background with sophisticated, minimal design
- **Typography:** Light, elegant fonts with wide letter spacing
- **Layout:** Minimal, luxury-focused design appropriate for fine art
- **Animations:** Subtle hover effects and transitions

### User Experience
- **Category Filtering:** Tab-style interface above gallery
- **Lightbox:** Professional full-screen viewing experience for detailed examination
- **Admin Interface:** Clean, functional upload system
- **Responsive:** Mobile-first design approach

## Current Status
✅ **Complete and Working:**
- Photo upload system
- Gallery display
- Category filtering
- Lightbox functionality
- Admin panel
- Database integration
- Cloud storage

## Future Enhancements (Not Yet Implemented)
- **Fine Art Specific Features:**
  - Print edition information (limited edition numbers)
  - Print size specifications
  - Pricing information (for collectors)
  - Certificate of authenticity details
  - Exhibition history
  - Artist statement and bio
  - Contact information for galleries/collectors
- **Technical Enhancements:**
  - Custom fonts (currently using system fonts)
  - SEO optimization for fine art market
  - Image optimization and lazy loading
  - User authentication for admin access
  - Deployment to production
  - Domain setup
  - Analytics integration

## Troubleshooting Notes

### Common Issues
1. **Context Usage 100%:** Conversation can continue, but may need to reference this file
2. **Image Loading Errors:** Check Supabase storage permissions
3. **Upload Failures:** Verify database policies are set correctly
4. **Server Not Starting:** Ensure you're in the correct directory

### SQL Commands for Database Setup
If database needs to be recreated, run these in Supabase SQL Editor:
```sql
-- Drop old policies
DROP POLICY IF EXISTS "Allow authenticated insert" ON photos;
DROP POLICY IF EXISTS "Allow authenticated update" ON photos;
DROP POLICY IF EXISTS "Allow authenticated delete" ON photos;

-- Create new policies
CREATE POLICY "Allow public insert" ON photos FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON photos FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON photos FOR DELETE USING (true);

-- Storage policies
INSERT INTO storage.buckets (id, name, public) VALUES ('photos', 'photos', true) ON CONFLICT (id) DO UPDATE SET public = true;
CREATE POLICY "Allow public uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'photos');
CREATE POLICY "Allow public downloads" ON storage.objects FOR SELECT USING (bucket_id = 'photos');
```

## Project Goals Achieved
- ✅ Professional fine art photography portfolio
- ✅ Easy photo upload system
- ✅ Beautiful gallery display
- ✅ Category organization
- ✅ Luxury aesthetic appropriate for fine art
- ✅ Mobile responsive
- ✅ Modern web technologies

## Notes for Future Sessions
- **Fine Art Focus:** This is for high-end collectors, museums, and galleries
- **Target Market:** Limited edition prints, large format photography
- **Aesthetic:** Minimal, luxury aesthetic appropriate for fine art market
- **Avoid:** Commercial photography website look
- **Focus:** Functionality first, then polish details
- **Learning:** Fernando is learning development concepts, so explain technical decisions
- **Project Location:** `/Users/fernandobalino/Projects/photography-portfolio`

## Fine Art Portfolio Considerations
- **Image Quality:** High-resolution images for detailed examination
- **Presentation:** Professional, gallery-like presentation
- **Information:** Detailed descriptions, techniques, and context
- **Accessibility:** Easy navigation for collectors and curators
- **Professionalism:** Reflects the value and quality of the work

---
*Last Updated: August 3, 2024*
*Project Status: Complete and Functional*
*Target Market: Fine Art Collectors, Museums, Galleries* 