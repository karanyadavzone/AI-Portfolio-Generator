import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Calendar, Building } from 'lucide-react'
import { Portfolio } from '@/lib/sanity'

interface PortfolioTemplateProps {
  portfolio: Portfolio
}

export function PortfolioTemplate({ portfolio }: PortfolioTemplateProps) {
  const ThemeComponent = portfolioThemes[portfolio.theme as keyof typeof portfolioThemes] || ModernDarkTheme
  
  return <ThemeComponent portfolio={portfolio} />
}

const portfolioThemes = {
  'modern-dark': ModernDarkTheme,
  'minimal-light': MinimalLightTheme,
  'creative-gradient': CreativeGradientTheme,
  'professional-blue': ProfessionalBlueTheme,
  'startup-green': StartupGreenTheme,
  'designer-purple': DesignerPurpleTheme,
  'tech-neon': TechNeonTheme,
  'corporate-gray': CorporateGrayTheme,
}

// Modern Dark Theme
function ModernDarkTheme({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/portfolios" className="inline-flex items-center text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold">{portfolio.name.charAt(0)}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{portfolio.name}</h1>
          <p className="text-xl text-blue-400 mb-6">{portfolio.headline}</p>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
            {portfolio.careerSummary}
          </p>
          
          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {portfolio.email && (
              <a href={`mailto:${portfolio.email}`} className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                {portfolio.email}
              </a>
            )}
            {portfolio.phone && (
              <a href={`tel:${portfolio.phone}`} className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                {portfolio.phone}
              </a>
            )}
            {portfolio.location && (
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                {portfolio.location}
              </div>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Skills & Expertise</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {portfolio.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Work Experience</h2>
          <div className="space-y-8">
            {portfolio.experience.map((exp, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-400">{exp.position}</h3>
                    <div className="flex items-center mt-1">
                      <Building className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-gray-300">{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {exp.duration}
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolio.projects.map((project, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-blue-400">{project.title}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-700 text-xs rounded-md text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Social Links */}
        {portfolio.socialLinks && portfolio.socialLinks.length > 0 && (
          <section className="text-center">
            <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
            <div className="flex justify-center gap-4">
              {portfolio.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                >
                  {link.platform === 'LinkedIn' && <Linkedin className="h-5 w-5" />}
                  {link.platform === 'GitHub' && <Github className="h-5 w-5" />}
                  {!['LinkedIn', 'GitHub'].includes(link.platform) && <ExternalLink className="h-5 w-5" />}
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

// Minimal Light Theme
function MinimalLightTheme({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/portfolios" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-gray-700">{portfolio.name.charAt(0)}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{portfolio.name}</h1>
          <p className="text-xl text-gray-600 mb-6">{portfolio.headline}</p>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            {portfolio.careerSummary}
          </p>
          
          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {portfolio.email && (
              <a href={`mailto:${portfolio.email}`} className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                {portfolio.email}
              </a>
            )}
            {portfolio.phone && (
              <a href={`tel:${portfolio.phone}`} className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                {portfolio.phone}
              </a>
            )}
            {portfolio.location && (
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {portfolio.location}
              </div>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Skills & Expertise</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {portfolio.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Work Experience</h2>
          <div className="space-y-8">
            {portfolio.experience.map((exp, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                    <div className="flex items-center mt-1">
                      <Building className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {exp.duration}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolio.projects.map((project, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-200 text-xs rounded-md text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Social Links */}
        {portfolio.socialLinks && portfolio.socialLinks.length > 0 && (
          <section className="text-center">
            <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
            <div className="flex justify-center gap-4">
              {portfolio.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {link.platform === 'LinkedIn' && <Linkedin className="h-5 w-5" />}
                  {link.platform === 'GitHub' && <Github className="h-5 w-5" />}
                  {!['LinkedIn', 'GitHub'].includes(link.platform) && <ExternalLink className="h-5 w-5" />}
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

// Creative Gradient Theme
function CreativeGradientTheme({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/portfolios" className="inline-flex items-center text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="bg-gradient-to-r from-pink-500 to-violet-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold">{portfolio.name.charAt(0)}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
            {portfolio.name}
          </h1>
          <p className="text-xl text-pink-300 mb-6">{portfolio.headline}</p>
          <p className="text-white/90 text-lg leading-relaxed max-w-3xl mx-auto">
            {portfolio.careerSummary}
          </p>
          
          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {portfolio.email && (
              <a href={`mailto:${portfolio.email}`} className="flex items-center text-white/70 hover:text-pink-300 transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                {portfolio.email}
              </a>
            )}
            {portfolio.phone && (
              <a href={`tel:${portfolio.phone}`} className="flex items-center text-white/70 hover:text-pink-300 transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                {portfolio.phone}
              </a>
            )}
            {portfolio.location && (
              <div className="flex items-center text-white/70">
                <MapPin className="h-4 w-4 mr-2" />
                {portfolio.location}
              </div>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Skills & Expertise</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {portfolio.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium hover:bg-white/20 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Work Experience</h2>
          <div className="space-y-8">
            {portfolio.experience.map((exp, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-pink-300">{exp.position}</h3>
                    <div className="flex items-center mt-1">
                      <Building className="h-4 w-4 mr-2 text-white/70" />
                      <span className="text-white/90">{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-white/60 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {exp.duration}
                  </div>
                </div>
                <p className="text-white/90 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolio.projects.map((project, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-pink-300">{project.title}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-pink-300 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <p className="text-white/90 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-white/10 text-xs rounded-md text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Social Links */}
        {portfolio.socialLinks && portfolio.socialLinks.length > 0 && (
          <section className="text-center">
            <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
            <div className="flex justify-center gap-4">
              {portfolio.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                >
                  {link.platform === 'LinkedIn' && <Linkedin className="h-5 w-5" />}
                  {link.platform === 'GitHub' && <Github className="h-5 w-5" />}
                  {!['LinkedIn', 'GitHub'].includes(link.platform) && <ExternalLink className="h-5 w-5" />}
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

// Professional Blue Theme
function ProfessionalBlueTheme({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900">
      {/* Header */}
      <header className="bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/portfolios" className="inline-flex items-center text-blue-100 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="bg-blue-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-white">{portfolio.name.charAt(0)}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">{portfolio.name}</h1>
          <p className="text-xl text-blue-700 mb-6">{portfolio.headline}</p>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            {portfolio.careerSummary}
          </p>
          
          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {portfolio.email && (
              <a href={`mailto:${portfolio.email}`} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                {portfolio.email}
              </a>
            )}
            {portfolio.phone && (
              <a href={`tel:${portfolio.phone}`} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                {portfolio.phone}
              </a>
            )}
            {portfolio.location && (
              <div className="flex items-center text-blue-600">
                <MapPin className="h-4 w-4 mr-2" />
                {portfolio.location}
              </div>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">Skills & Expertise</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {portfolio.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-sm font-medium text-blue-800 hover:bg-blue-200 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center text-blue-900">Work Experience</h2>
          <div className="space-y-8">
            {portfolio.experience.map((exp, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-blue-200 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-800">{exp.position}</h3>
                    <div className="flex items-center mt-1">
                      <Building className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-gray-700">{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-blue-600 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {exp.duration}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center text-blue-900">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolio.projects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-blue-200 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-blue-800">{project.title}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-blue-100 text-xs rounded-md text-blue-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Social Links */}
        {portfolio.socialLinks && portfolio.socialLinks.length > 0 && (
          <section className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-blue-900">Connect With Me</h2>
            <div className="flex justify-center gap-4">
              {portfolio.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                >
                  {link.platform === 'LinkedIn' && <Linkedin className="h-5 w-5 text-blue-600" />}
                  {link.platform === 'GitHub' && <Github className="h-5 w-5 text-blue-600" />}
                  {!['LinkedIn', 'GitHub'].includes(link.platform) && <ExternalLink className="h-5 w-5 text-blue-600" />}
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

// Startup Green Theme - Modern startup style
function StartupGreenTheme({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-green-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/portfolios" className="inline-flex items-center text-green-100 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Link>
        </div>
      </header>

      {/* Hero Section - Full width with split layout */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-green-500 rounded-full text-sm font-medium mb-6">
              🚀 Available for new opportunities
            </div>
            <h1 className="text-5xl font-bold mb-6">{portfolio.name}</h1>
            <p className="text-2xl text-green-100 mb-8">{portfolio.headline}</p>
            <p className="text-lg text-green-50 leading-relaxed mb-8">
              {portfolio.careerSummary}
            </p>
            <div className="flex flex-wrap gap-4">
              {portfolio.email && (
                <a href={`mailto:${portfolio.email}`} className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                  Get In Touch
                </a>
              )}
              <a href="#projects" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
                View Work
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-80 h-80 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-6xl font-bold text-white">{portfolio.name.charAt(0)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {portfolio.stats && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{portfolio.stats.yearsExperience}</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{portfolio.stats.projectsCompleted}</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{portfolio.stats.clientsSatisfied}</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{portfolio.stats.codeCommits}</div>
                <div className="text-gray-600">Code Commits</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skills in card format */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Tech Stack & Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {portfolio.skills.map((skill, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-green-100 text-center hover:shadow-md transition-shadow">
                <div className="text-green-600 font-semibold">{skill}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.projects.map((project, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{project.title.charAt(0)}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{project.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                  {project.metrics && (
                    <div className="text-green-600 font-semibold text-sm mb-4">📊 {project.metrics}</div>
                  )}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a href={project.link} className="text-green-600 hover:text-green-800 font-semibold text-sm">
                      View Project →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Designer Purple Theme - Creative portfolio style
function DesignerPurpleTheme({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/portfolios" className="inline-flex items-center text-purple-200 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Link>
        </div>
      </header>

      {/* Creative Hero */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-8 flex items-center justify-center">
            <span className="text-4xl font-bold">{portfolio.name.charAt(0)}</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {portfolio.name}
          </h1>
          <p className="text-2xl text-purple-200 mb-8">{portfolio.headline}</p>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-purple-100 leading-relaxed">{portfolio.careerSummary}</p>
          </div>
        </div>
      </section>

      {/* Artistic Skills Display */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Creative Arsenal</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-purple-300">Design Tools</h3>
              <div className="space-y-3">
                {portfolio.skills.filter(skill => skill.toLowerCase().includes('design') || skill.toLowerCase().includes('figma') || skill.toLowerCase().includes('adobe')).map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-pink-300">Development</h3>
              <div className="space-y-3">
                {portfolio.skills.filter(skill => skill.toLowerCase().includes('react') || skill.toLowerCase().includes('css') || skill.toLowerCase().includes('html')).map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-rose-300">Strategy</h3>
              <div className="space-y-3">
                {portfolio.skills.filter(skill => !skill.toLowerCase().includes('design') && !skill.toLowerCase().includes('react') && !skill.toLowerCase().includes('css')).slice(0, 5).map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Featured Creations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {portfolio.projects.map((project, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="h-80 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">{project.title.charAt(0)}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      {project.link && (
                        <a href={project.link} className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-100 transition-colors">
                          Explore Project
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-purple-200 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Tech Neon Theme - Futuristic cyber style
function TechNeonTheme({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Terminal Header */}
      <header className="bg-gray-900 border-b border-green-400">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/portfolios" className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              cd ../gallery
            </Link>
            <div className="text-green-400">
              ~/portfolio/{portfolio.name.toLowerCase().replace(/\s+/g, '-')}
            </div>
          </div>
        </div>
      </header>

      {/* Terminal Window */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-900 rounded-lg border border-green-400 overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 border-b border-green-400 flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-4 text-green-400">terminal - {portfolio.name}</span>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <span className="text-blue-400">$</span> <span className="text-white">whoami</span>
              </div>
              <div className="mb-6 text-green-300">
                {portfolio.name} - {portfolio.headline}
              </div>
              
              <div className="mb-4">
                <span className="text-blue-400">$</span> <span className="text-white">cat about.txt</span>
              </div>
              <div className="mb-6 text-green-200 leading-relaxed">
                {portfolio.careerSummary}
              </div>

              <div className="mb-4">
                <span className="text-blue-400">$</span> <span className="text-white">ls skills/</span>
              </div>
              <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-2">
                {portfolio.skills.map((skill, index) => (
                  <div key={index} className="text-cyan-400">
                    {skill}.exe
                  </div>
                ))}
              </div>

              {portfolio.stats && (
                <>
                  <div className="mb-4">
                    <span className="text-blue-400">$</span> <span className="text-white">system stats</span>
                  </div>
                  <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-yellow-400">UPTIME:</div>
                      <div className="text-green-300">{portfolio.stats.yearsExperience}</div>
                    </div>
                    <div>
                      <div className="text-yellow-400">PROCESSES:</div>
                      <div className="text-green-300">{portfolio.stats.projectsCompleted}</div>
                    </div>
                    <div>
                      <div className="text-yellow-400">CONNECTIONS:</div>
                      <div className="text-green-300">{portfolio.stats.clientsSatisfied}</div>
                    </div>
                    <div>
                      <div className="text-yellow-400">COMMITS:</div>
                      <div className="text-green-300">{portfolio.stats.codeCommits}</div>
                    </div>
                  </div>
                </>
              )}

              <div className="mb-4">
                <span className="text-blue-400">$</span> <span className="text-white">ls projects/</span>
              </div>
              <div className="space-y-4">
                {portfolio.projects.map((project, index) => (
                  <div key={index} className="border border-green-800 rounded p-4 bg-gray-800/50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-cyan-400 font-bold">{project.title}/</h3>
                      {project.link && (
                        <a href={project.link} className="text-yellow-400 hover:text-yellow-300">
                          [LIVE]
                        </a>
                      )}
                    </div>
                    <p className="text-green-200 text-sm mb-3">{project.description}</p>
                    {project.metrics && (
                      <div className="text-blue-300 text-sm mb-2">// {project.metrics}</div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="text-purple-400 text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center">
                <span className="text-blue-400">$</span>
                <span className="ml-2 text-white animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Corporate Gray Theme - Professional corporate style
function CorporateGrayTheme({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Executive Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/portfolios" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Directory
            </Link>
            <div className="text-gray-500 text-sm">Executive Profile</div>
          </div>
        </div>
      </header>

      {/* Executive Summary */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{portfolio.name}</h1>
              <p className="text-xl text-gray-600 mb-6">{portfolio.headline}</p>
              <p className="text-gray-700 leading-relaxed text-lg">{portfolio.careerSummary}</p>
              
              {portfolio.email && (
                <div className="mt-8">
                  <a href={`mailto:${portfolio.email}`} className="bg-gray-900 text-white px-8 py-3 rounded font-semibold hover:bg-gray-800 transition-colors">
                    Contact for Opportunities
                  </a>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              {portfolio.stats && (
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-4">Key Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Experience</span>
                      <span className="font-semibold">{portfolio.stats.yearsExperience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Projects Led</span>
                      <span className="font-semibold">{portfolio.stats.projectsCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Client Success</span>
                      <span className="font-semibold">{portfolio.stats.clientsSatisfied}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-2 text-gray-600">
                  {portfolio.email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{portfolio.email}</span>
                    </div>
                  )}
                  {portfolio.location && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{portfolio.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Core Competencies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {portfolio.skills.map((skill, index) => (
              <div key={index} className="bg-white p-4 rounded text-center shadow-sm">
                <span className="text-gray-700 font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Professional Experience</h2>
          <div className="space-y-8">
            {portfolio.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-gray-300 pl-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                  <span className="text-gray-500">{exp.duration}</span>
                </div>
                <h4 className="text-lg text-gray-700 mb-3">{exp.company}</h4>
                <p className="text-gray-600 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Projects */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Key Projects & Initiatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolio.projects.map((project, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm border">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                {project.metrics && (
                  <div className="text-gray-700 font-semibold mb-4">Results: {project.metrics}</div>
                )}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 