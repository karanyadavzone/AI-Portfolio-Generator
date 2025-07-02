import { createClient } from '@sanity/client'

// Check if environment variables are set
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId) {
  console.warn('⚠️  Sanity Project ID is not set. Please add NEXT_PUBLIC_SANITY_PROJECT_ID to your .env.local file.')
}

export const sanityClient = createClient({
  projectId: projectId || 'dummy-project-id', // Fallback to prevent crashes
  dataset: dataset,
  useCdn: false,
  apiVersion: '2023-12-01',
  token: token,
})

export interface Portfolio {
  _id: string
  _type: 'portfolio'
  name: string
  slug: {
    current: string
  }
  headline: string
  careerSummary: string
  skills: string[]
  experience: WorkExperience[]
  projects: Project[]
  stats: {
    yearsExperience: string
    projectsCompleted: string
    clientsSatisfied: string
    codeCommits: string
  }
  certifications: Certification[]
  education: Education[]
  testimonials: Testimonial[]
  services: Service[]
  theme: string
  generatedAt: string
  email?: string
  phone?: string
  location?: string
  socialLinks?: SocialLink[]
}

export interface WorkExperience {
  company: string
  position: string
  duration: string
  description: string
}

export interface Project {
  title: string
  description: string
  technologies: string[]
  link?: string
  github?: string
  metrics?: string
}

export interface Certification {
  name: string
  issuer: string
  year: string
}

export interface Education {
  degree: string
  institution: string
  year: string
  details: string
}

export interface Testimonial {
  name: string
  position: string
  company: string
  text: string
}

export interface Service {
  title: string
  description: string
  features: string[]
}

export interface SocialLink {
  platform: string
  url: string
}

export async function getAllPortfolios(): Promise<Portfolio[]> {
  // Return empty array if Sanity is not configured
  if (!projectId) {
    console.warn('⚠️  Sanity not configured. Returning empty portfolios array.')
    return []
  }

  try {
    const query = `*[_type == "portfolio"] | order(generatedAt desc) {
      _id,
      name,
      slug,
      headline,
      careerSummary,
      skills,
      experience,
      projects,
      stats,
      certifications,
      education,
      testimonials,
      services,
      theme,
      generatedAt,
      email,
      phone,
      location,
      socialLinks
    }`
    
    return await sanityClient.fetch(query)
  } catch (error) {
    console.error('Error fetching portfolios:', error)
    return []
  }
}

export async function getPortfolioBySlug(slug: string): Promise<Portfolio | null> {
  // Return null if Sanity is not configured
  if (!projectId) {
    console.warn('⚠️  Sanity not configured. Cannot fetch portfolio.')
    return null
  }

  try {
    const query = `*[_type == "portfolio" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      headline,
      careerSummary,
      skills,
      experience,
      projects,
      stats,
      certifications,
      education,
      testimonials,
      services,
      theme,
      generatedAt,
      email,
      phone,
      location,
      socialLinks
    }`
    
    return await sanityClient.fetch(query, { slug })
  } catch (error) {
    console.error('Error fetching portfolio:', error)
    return null
  }
} 