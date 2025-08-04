import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export interface Photo {
  id: string
  title: string
  description?: string
  category: 'portraits' | 'landscapes' | 'street' | 'abstract'
  image_url: string
  created_at: string
  updated_at: string
} 