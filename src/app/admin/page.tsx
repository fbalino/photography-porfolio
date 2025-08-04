import PhotoUpload from '@/components/PhotoUpload'
import PhotoList from '@/components/PhotoList'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-light text-white mb-12 text-center tracking-widest">
          ADMIN
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-light text-white mb-6 tracking-wider">Upload New Photo</h2>
            <PhotoUpload />
          </div>
          
          <div>
            <h2 className="text-2xl font-light text-white mb-6 tracking-wider">Uploaded Photos</h2>
            <PhotoList />
          </div>
        </div>
      </div>
    </div>
  )
} 