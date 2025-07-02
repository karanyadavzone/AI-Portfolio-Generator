import Link from 'next/link'
import { Calendar, MapPin, User } from 'lucide-react'
import { Portfolio } from '@/lib/sanity'

interface PortfolioCardProps {
  portfolio: Portfolio
}

const themeColors = {
  'modern-dark': 'from-gray-900 to-gray-700',
  'minimal-light': 'from-gray-50 to-white',
  'creative-gradient': 'from-purple-400 to-pink-400',
  'professional-blue': 'from-blue-600 to-blue-800',
}

const themeTextColors = {
  'modern-dark': 'text-white',
  'minimal-light': 'text-gray-900',
  'creative-gradient': 'text-white',
  'professional-blue': 'text-white',
}

export function PortfolioCard({ portfolio }: PortfolioCardProps) {
  const gradientClass = themeColors[portfolio.theme as keyof typeof themeColors] || themeColors['modern-dark']
  const textColorClass = themeTextColors[portfolio.theme as keyof typeof themeTextColors] || themeTextColors['modern-dark']
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  return (
    <Link href={`/portfolios/${portfolio.slug.current}`}>
      <div className="card-hover bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* Portfolio Preview Header */}
        <div className={`bg-gradient-to-r ${gradientClass} p-6 h-32 relative`}>
          <div className={`${textColorClass}`}>
            <h3 className="text-xl font-bold truncate">{portfolio.name}</h3>
            <p className="text-sm opacity-90 mt-1 truncate">{portfolio.headline}</p>
          </div>
          <div className="absolute top-4 right-4">
            <div className={`w-8 h-8 rounded-full ${textColorClass === 'text-white' ? 'bg-white/20' : 'bg-gray-900/10'} flex items-center justify-center`}>
              <User className={`h-4 w-4 ${textColorClass}`} />
            </div>
          </div>
        </div>

        {/* Portfolio Details */}
        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
              {portfolio.careerSummary}
            </p>
          </div>

          {/* Skills Preview */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {portfolio.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {skill}
                </span>
              ))}
              {portfolio.skills.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                  +{portfolio.skills.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(portfolio.generatedAt)}</span>
            </div>
            
            {portfolio.location && (
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span className="truncate max-w-20">{portfolio.location}</span>
              </div>
            )}
          </div>

          {/* Theme Badge */}
          <div className="mt-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
              {portfolio.theme.replace('-', ' ')} Theme
            </span>
          </div>
        </div>

        {/* View Portfolio Button */}
        <div className="px-6 pb-6">
          <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
            View Portfolio →
          </div>
        </div>
      </div>
    </Link>
  )
} 