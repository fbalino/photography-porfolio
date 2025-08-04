'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

type Category = 'portraits' | 'landscapes' | 'street' | 'abstract'

export default function PhotoUpload() {
  const [uploading, setUploading] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<Category>('portraits')
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    try {
      setUploading(true)

      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('photos')
        .upload(fileName, file)

      if (uploadError) {
        console.error('Upload error:', uploadError)
        throw uploadError
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('photos')
        .getPublicUrl(fileName)

      // Insert photo data into database
      const { error: insertError } = await supabase
        .from('photos')
        .insert({
          title,
          description,
          category,
          image_url: publicUrl
        })

      if (insertError) {
        console.error('Insert error:', insertError)
        throw insertError
      }

      // Reset form
      setTitle('')
      setDescription('')
      setCategory('portraits')
      setFile(null)
      
      alert('Photo uploaded successfully!')
    } catch (error) {
      console.error('Error uploading photo:', error)
      alert('Error uploading photo. Check console for details.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
      <h2 className="text-2xl font-light text-white mb-6 tracking-wider">Upload Photo</h2>
      
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block text-white/70 text-sm mb-2 tracking-wide">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/40 focus:outline-none focus:border-white/40"
            placeholder="Enter photo title"
            required
          />
        </div>

        <div>
          <label className="block text-white/70 text-sm mb-2 tracking-wide">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/40 focus:outline-none focus:border-white/40"
            placeholder="Enter description (optional)"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-white/70 text-sm mb-2 tracking-wide">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:border-white/40"
          >
            <option value="portraits">Portraits</option>
            <option value="landscapes">Landscapes</option>
            <option value="street">Street</option>
            <option value="abstract">Abstract</option>
          </select>
        </div>

        <div>
          <label className="block text-white/70 text-sm mb-2 tracking-wide">Photo</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-white/20 file:text-white hover:file:bg-white/30"
            required
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed tracking-wide"
        >
          {uploading ? 'Uploading...' : 'Upload Photo'}
        </button>
      </form>
    </div>
  )
} 