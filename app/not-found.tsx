import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-6">
        <div className="mb-8">
          <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Portfolio Not Found</h1>
          <p className="text-gray-600">
            The portfolio you're looking for doesn't exist or may have been removed.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/portfolios"
            className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Gallery</span>
          </Link>
          
          <div className="text-gray-400">or</div>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            <Home className="h-4 w-4" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
} 