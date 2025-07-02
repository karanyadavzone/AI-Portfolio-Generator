'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Sparkles, Wand2, Users, Zap } from 'lucide-react'
import toast from 'react-hot-toast'

const portfolioSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  careerSummary: z.string().min(50, 'Career summary must be at least 50 characters'),
  skills: z.string().min(10, 'Please add at least a few skills'),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  location: z.string().optional(),
  additionalInfo: z.string().optional(),
  portfolioStyle: z.string().optional(),
  targetAudience: z.string().optional(),
  designReference: z.string().optional(),
  colorPreference: z.string().optional(),
  layoutStyle: z.string().optional(),
})

type PortfolioFormData = z.infer<typeof portfolioSchema>

export default function HomePage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
  })

  const watchedSkills = watch('skills', '')
  const skillsArray = watchedSkills ? watchedSkills.split(',').map(s => s.trim()).filter(Boolean) : []

  const onSubmit = async (data: PortfolioFormData) => {
    setIsGenerating(true)
    const loadingToast = toast.loading('AI is crafting your portfolio...')

    try {
      const response = await fetch('/api/generate-portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          skills: data.skills.split(',').map(s => s.trim()).filter(Boolean),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate portfolio')
      }

      const result = await response.json()
      toast.dismiss(loadingToast)
      toast.success('Portfolio generated successfully!')
      
      // Redirect to the generated portfolio
      router.push(`/portfolios/${result.slug}`)
    } catch (error) {
      toast.dismiss(loadingToast)
      toast.error('Failed to generate portfolio. Please try again.')
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold gradient-text">AI Portfolio Generator</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                Features
              </a>
              <a href="/portfolios" className="text-gray-600 hover:text-blue-600 transition-colors">
                Gallery
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            <span>AI-Powered Portfolio Creation</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Your Dream Portfolio in{' '}
            <span className="gradient-text">Seconds</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Just provide your basic information and let our AI craft a stunning, 
            professional portfolio that showcases your skills and experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Wand2 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">AI Generated</h3>
              <p className="text-sm text-gray-600">Smart AI creates professional content</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Beautiful Design</h3>
              <p className="text-sm text-gray-600">Multiple stunning themes to choose from</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Ready to Share</h3>
              <p className="text-sm text-gray-600">Get your own URL to share instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Let's Create Your Portfolio
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Career Summary */}
              <div>
                <label htmlFor="careerSummary" className="block text-sm font-medium text-gray-700 mb-2">
                  Career Summary *
                </label>
                <textarea
                  id="careerSummary"
                  rows={4}
                  {...register('careerSummary')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Describe your professional background, experience, and what you do..."
                />
                {errors.careerSummary && (
                  <p className="text-red-600 text-sm mt-1">{errors.careerSummary.message}</p>
                )}
              </div>

              {/* Skills */}
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                  Skills * <span className="text-gray-500">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  id="skills"
                  {...register('skills')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="React, TypeScript, Node.js, Python, Design..."
                />
                {skillsArray.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skillsArray.slice(0, 10).map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                    {skillsArray.length > 10 && (
                      <span className="text-xs text-gray-500">+{skillsArray.length - 10} more</span>
                    )}
                  </div>
                )}
                {errors.skills && (
                  <p className="text-red-600 text-sm mt-1">{errors.skills.message}</p>
                )}
              </div>

              {/* Optional Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    {...register('location')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              {/* Additional Info */}
              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="additionalInfo"
                  rows={3}
                  {...register('additionalInfo')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Any specific achievements, certifications, or details you'd like to highlight..."
                />
              </div>

              {/* Design Preferences Section */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  🎨 Design Preferences <span className="text-sm font-normal text-gray-500 ml-2">(Optional)</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Portfolio Style */}
                  <div>
                    <label htmlFor="portfolioStyle" className="block text-sm font-medium text-gray-700 mb-2">
                      Portfolio Style
                    </label>
                    <select
                      id="portfolioStyle"
                      {...register('portfolioStyle')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Choose a style...</option>
                      <option value="Modern Tech">🚀 Modern Tech (Neon/Terminal)</option>
                      <option value="Minimal Professional">✨ Minimal Professional (Clean)</option>
                      <option value="Creative Designer">🎨 Creative Designer (Purple)</option>
                      <option value="Corporate Executive">👔 Corporate Executive (Gray)</option>
                      <option value="Startup Founder">💡 Startup Founder (Green)</option>
                      <option value="Gradient Artistic">🌈 Gradient Artistic (Colorful)</option>
                      <option value="Professional Blue">💙 Professional Blue (Business)</option>
                      <option value="Dark Modern">⚫ Dark Modern (Sophisticated)</option>
                    </select>
                  </div>

                  {/* Target Audience */}
                  <div>
                    <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-2">
                      Target Audience
                    </label>
                    <select
                      id="targetAudience"
                      {...register('targetAudience')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Who will see this?</option>
                      <option value="employers">Potential Employers</option>
                      <option value="clients">Freelance Clients</option>
                      <option value="investors">Investors/VCs</option>
                      <option value="peers">Industry Peers</option>
                      <option value="customers">Potential Customers</option>
                    </select>
                  </div>

                  {/* Color Preference */}
                  <div>
                    <label htmlFor="colorPreference" className="block text-sm font-medium text-gray-700 mb-2">
                      Color Preference
                    </label>
                    <select
                      id="colorPreference"
                      {...register('colorPreference')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Choose colors...</option>
                      <option value="dark-modern">Dark & Modern (Black/Blue)</option>
                      <option value="light-clean">Light & Clean (White/Gray)</option>
                      <option value="blue-professional">Blue Professional</option>
                      <option value="green-growth">Green Growth</option>
                      <option value="purple-creative">Purple Creative</option>
                      <option value="custom-brand">Match my brand colors</option>
                    </select>
                  </div>

                  {/* Layout Style */}
                  <div>
                    <label htmlFor="layoutStyle" className="block text-sm font-medium text-gray-700 mb-2">
                      Layout Style
                    </label>
                    <select
                      id="layoutStyle"
                      {...register('layoutStyle')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Choose layout...</option>
                      <option value="single-page">Single Page (Scrolling)</option>
                      <option value="multi-section">Multi-Section Dashboard</option>
                      <option value="grid-modern">Modern Grid Layout</option>
                      <option value="timeline-based">Timeline Based</option>
                      <option value="portfolio-showcase">Portfolio Showcase</option>
                    </select>
                  </div>
                </div>

                {/* Design Reference */}
                <div className="mt-4">
                  <label htmlFor="designReference" className="block text-sm font-medium text-gray-700 mb-2">
                    Design Reference <span className="text-gray-500">(URL or description)</span>
                  </label>
                  <input
                    type="text"
                    id="designReference"
                    {...register('designReference')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Share a portfolio URL you like or describe your ideal design..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    💡 Share a portfolio design you admire or describe the style you want
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Creating Your Portfolio...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    <span>Generate My Portfolio</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6" />
              <span className="text-xl font-bold">AI Portfolio Generator</span>
            </div>
            <p className="text-gray-400">
              Create stunning portfolios with the power of AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 