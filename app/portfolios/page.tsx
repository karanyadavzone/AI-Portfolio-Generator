import { getAllPortfolios } from '@/lib/sanity'
import { PortfolioCard } from '@/components/PortfolioCard'
import { Sparkles, Plus, Users } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 60 // Revalidate every minute

export default async function PortfoliosPage() {
  let portfolios: any[] = []
  let error = null

  try {
    portfolios = await getAllPortfolios()
  } catch (err) {
    console.error('Error loading portfolios:', err)
    error = 'Failed to load portfolios'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold gradient-text">AI Portfolio Generator</h1>
            </Link>
            <Link 
              href="/"
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Create New Portfolio</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="h-4 w-4" />
            <span>{error ? 'Portfolio' : `${portfolios.length} Portfolios Created`} Gallery</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Portfolio <span className="gradient-text">Gallery</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore amazing portfolios created with AI. Get inspired and create your own!
          </p>
        </div>
      </section>

      {/* Portfolios Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {error ? (
            <div className="text-center py-20">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to load portfolios</h3>
              <p className="text-gray-600 mb-2">There was an issue connecting to the database.</p>
              <p className="text-sm text-gray-500 mb-6">Please check your environment configuration.</p>
              <Link href="/" className="btn-primary inline-flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Create New Portfolio</span>
              </Link>
            </div>
          ) : portfolios.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolios.map((portfolio) => (
                <PortfolioCard key={portfolio._id} portfolio={portfolio} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No portfolios yet</h3>
              <p className="text-gray-600 mb-6">Be the first to create an AI-powered portfolio!</p>
              <Link href="/" className="btn-primary inline-flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Create First Portfolio</span>
              </Link>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      {portfolios.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Your Portfolio?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join others who've already created their professional portfolios with AI
            </p>
            <Link 
              href="/"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <Sparkles className="h-5 w-5" />
              <span>Get Started Now</span>
            </Link>
          </div>
        </section>
      )}
    </div>
  )
} 