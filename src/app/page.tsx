'use client'

import { useState, useEffect } from 'react'
import { supabase, Photo } from '@/lib/supabase'
import Lightbox from '@/components/Lightbox'

export default function Home() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

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

  const filteredPhotos = selectedCategory 
    ? photos.filter(photo => photo.category === selectedCategory)
    : photos

  const categories = ['portraits', 'landscapes', 'street', 'abstract']

  const openLightbox = (photo: Photo) => {
    setLightboxPhoto(photo)
    setLightboxIndex(filteredPhotos.findIndex(p => p.id === photo.id))
  }

  const closeLightbox = () => {
    setLightboxPhoto(null)
    setLightboxIndex(0)
  }

  const nextPhoto = () => {
    if (lightboxIndex < filteredPhotos.length - 1) {
      setLightboxIndex(lightboxIndex + 1)
      setLightboxPhoto(filteredPhotos[lightboxIndex + 1])
    }
  }

  const previousPhoto = () => {
    if (lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1)
      setLightboxPhoto(filteredPhotos[lightboxIndex - 1])
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-light text-white tracking-wider">
            FERNANDO BALINO
          </h1>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-purple-900/10"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-6xl md:text-8xl font-extralight text-white mb-6 tracking-widest">
            FERNANDO
          </h2>
          <h3 className="text-6xl md:text-8xl font-extralight text-white mb-8 tracking-widest">
            BALINO
          </h3>
          <p className="text-lg text-white/60 font-light tracking-wider uppercase">
            Photography
          </p>
        </div>
        
        {/* Subtle animated elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-1 bg-white/5 backdrop-blur-sm rounded-lg p-1 border border-white/10">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-3 rounded-md text-sm tracking-wide transition-all duration-300 ${
                  selectedCategory === null
                    ? 'bg-white text-black'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                All Photos
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-md text-sm tracking-wide transition-all duration-300 capitalize ${
                    selectedCategory === category
                      ? 'bg-white text-black'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-20">
              <p className="text-white/60">Loading photos...</p>
            </div>
          ) : filteredPhotos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/60">
                {selectedCategory 
                  ? `No photos in ${selectedCategory} category yet.` 
                  : 'No photos uploaded yet.'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPhotos.map((photo) => (
                <div 
                  key={photo.id} 
                  className="group relative overflow-hidden aspect-[4/5] bg-gradient-to-br from-gray-900 to-gray-800 hover:scale-[1.02] transition-transform duration-700 cursor-pointer"
                  onClick={() => openLightbox(photo)}
                >
                  <img 
                    src={photo.image_url} 
                    alt={photo.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white/80 text-sm tracking-wide">{photo.title}</p>
                    <p className="text-white/50 text-xs tracking-wider capitalize">{photo.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        photo={lightboxPhoto}
        onClose={closeLightbox}
        onNext={nextPhoto}
        onPrevious={previousPhoto}
        hasNext={lightboxIndex < filteredPhotos.length - 1}
        hasPrevious={lightboxIndex > 0}
      />

      {/* Minimal Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/40 text-sm tracking-wider">
            © 2024 Fernando Balino. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
