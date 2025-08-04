'use client'

import { useState, useEffect } from 'react'
import { supabase, Photo } from '@/lib/supabase'
import Image from 'next/image'

export default function PhotoList() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching photos:', error)
        return
      }

      setPhotos(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return

    try {
      const { error } = await supabase
        .from('photos')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting photo:', error)
        return
      }

      // Refresh the list
      fetchPhotos()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6">
        <p className="text-white/60">Loading photos...</p>
      </div>
    )
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6">
      {photos.length === 0 ? (
        <p className="text-white/60">No photos uploaded yet.</p>
      ) : (
        <div className="space-y-4">
          {photos.map((photo) => (
            <div key={photo.id} className="flex items-center space-x-4 p-4 bg-white/5 rounded border border-white/10">
              <div className="w-16 h-16 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                <img 
                  src={photo.image_url} 
                  alt={photo.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement
                    target.style.display = 'none'
                    const sibling = target.nextElementSibling as HTMLElement
                    if (sibling) {
                      sibling.style.display = 'flex'
                    }
                  }}
                />
                <div className="w-full h-full bg-gray-700 flex items-center justify-center" style={{display: 'none'}}>
                  <span className="text-white/40 text-xs">IMG</span>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-white font-medium">{photo.title}</h3>
                <p className="text-white/60 text-sm capitalize">{photo.category}</p>
                <p className="text-white/40 text-xs">
                  {new Date(photo.created_at).toLocaleDateString()}
                </p>
                {photo.description && (
                  <p className="text-white/50 text-sm mt-1">{photo.description}</p>
                )}
              </div>
              
              <div className="flex space-x-2">
                <a 
                  href={photo.image_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-sm rounded transition-colors"
                >
                  View
                </a>
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm rounded transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded">
        <h4 className="text-blue-300 font-medium mb-2">Database Info:</h4>
        <p className="text-blue-200/80 text-sm">
          Total photos: {photos.length}
        </p>
        <p className="text-blue-200/80 text-sm">
          Photos are stored in Supabase cloud storage and database.
        </p>
      </div>
    </div>
  )
} 