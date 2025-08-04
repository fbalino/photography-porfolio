'use client'

import { useEffect } from 'react'
import { Photo } from '@/lib/supabase'

interface LightboxProps {
  photo: Photo | null
  onClose: () => void
  onNext?: () => void
  onPrevious?: () => void
  hasNext?: boolean
  hasPrevious?: boolean
}

export default function Lightbox({ photo, onClose, onNext, onPrevious, hasNext, hasPrevious }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && hasNext && onNext) onNext()
      if (e.key === 'ArrowLeft' && hasPrevious && onPrevious) onPrevious()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onNext, onPrevious, hasNext, hasPrevious])

  if (!photo) return null

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation buttons */}
      {hasPrevious && onPrevious && (
        <button
          onClick={onPrevious}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {hasNext && onNext && (
        <button
          onClick={onNext}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Image container */}
      <div className="relative max-w-7xl max-h-full p-6">
        <img
          src={photo.image_url}
          alt={photo.title}
          className="max-w-full max-h-full object-contain"
        />
        
        {/* Photo info overlay */}
        <div className="absolute bottom-6 left-6 right-6 bg-black/50 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-white text-xl font-light mb-2">{photo.title}</h3>
          <p className="text-white/60 text-sm capitalize">{photo.category}</p>
          {photo.description && (
            <p className="text-white/80 text-sm mt-2">{photo.description}</p>
          )}
        </div>
      </div>

      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  )
} 