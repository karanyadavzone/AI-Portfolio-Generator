import OpenAI from 'openai'

export interface PortfolioInput {
  name: string
  careerSummary: string
  skills: string[]
  email?: string
  phone?: string
  location?: string
  additionalInfo?: string
  portfolioStyle?: string
  targetAudience?: string
  designReference?: string
  colorPreference?: string
  layoutStyle?: string
}

export interface GeneratedPortfolioData {
  headline: string
  enhancedCareerSummary: string
  experience: Array<{
    company: string
    position: string
    duration: string
    description: string
  }>
  projects: Array<{
    title: string
    description: string
    technologies: string[]
    link?: string
    metrics?: string
  }>
  stats: {
    yearsExperience: string
    projectsCompleted: string
    clientsSatisfied: string
    codeCommits: string
  }
  certifications: Array<{
    name: string
    issuer: string
    year: string
  }>
  education: Array<{
    degree: string
    institution: string
    year: string
    details: string
  }>
  testimonials: Array<{
    name: string
    position: string
    company: string
    text: string
  }>
  services: Array<{
    title: string
    description: string
    features: string[]
  }>
  theme: string
  socialLinks?: Array<{
    platform: string
    url: string
  }>
}

export class PortfolioAIAgent {
  private openai: OpenAI

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY
    
    if (!apiKey) {
      throw new Error('⚠️  OpenAI API key is not set. Please add OPENAI_API_KEY to your .env.local file.')
    }
    
    this.openai = new OpenAI({
      apiKey: apiKey,
    })
  }

  async generatePortfolioData(input: PortfolioInput): Promise<GeneratedPortfolioData> {
    // Theme mapping for consistent styling
    const themeMapping = {
      'Modern Tech': 'tech-neon',
      'Minimal Professional': 'minimal-light', 
      'Creative Designer': 'designer-purple',
      'Corporate Executive': 'corporate-gray',
      'Startup Founder': 'startup-green',
      'Gradient Artistic': 'creative-gradient',
      'Professional Blue': 'professional-blue',
      'Dark Modern': 'modern-dark'
    }

    const selectedTheme = themeMapping[input.portfolioStyle as keyof typeof themeMapping] || 'modern-dark'

    // Style-specific content guidelines
    const styleGuidelines = {
      'Modern Tech': {
        tone: 'Technical, innovative, cutting-edge',
        focus: 'Scalable systems, AI/ML, cloud architecture, performance optimization',
        metrics: 'System uptime, performance gains, user scaling, code quality',
        projectTypes: 'AI platforms, cloud systems, dev tools, tech products'
      },
      'Minimal Professional': {
        tone: 'Clean, sophisticated, results-driven',
        focus: 'Business impact, efficiency, strategic solutions',
        metrics: 'ROI, efficiency gains, client satisfaction, process improvements',
        projectTypes: 'Business solutions, consulting projects, process optimization'
      },
      'Creative Designer': {
        tone: 'Artistic, passionate, visually-focused',
        focus: 'User experience, visual design, brand identity, creative campaigns',
        metrics: 'User engagement, brand lift, conversion rates, design awards',
        projectTypes: 'Brand campaigns, UX redesigns, creative projects, art installations'
      },
      'Corporate Executive': {
        tone: 'Strategic, authoritative, business-focused',
        focus: 'Leadership, strategy, team management, business growth',
        metrics: 'Revenue growth, team size, budget managed, market expansion',
        projectTypes: 'Strategic initiatives, mergers & acquisitions, business transformation'
      },
      'Startup Founder': {
        tone: 'Dynamic, entrepreneurial, growth-oriented',
        focus: 'Innovation, scaling, market disruption, venture building',
        metrics: 'Funding raised, user growth, market share, valuation',
        projectTypes: 'Startup launches, funding rounds, product pivots, market expansion'
      },
      'Gradient Artistic': {
        tone: 'Creative, expressive, boundary-pushing',
        focus: 'Creative expression, artistic vision, innovative design',
        metrics: 'Creative impact, artistic recognition, audience engagement',
        projectTypes: 'Art projects, creative campaigns, innovative designs, exhibitions'
      },
      'Professional Blue': {
        tone: 'Trustworthy, reliable, professional',
        focus: 'Quality delivery, client success, proven expertise',
        metrics: 'Client retention, project success rate, quality scores',
        projectTypes: 'Enterprise solutions, consulting projects, professional services'
      },
      'Dark Modern': {
        tone: 'Sophisticated, contemporary, tech-forward',
        focus: 'Modern solutions, digital transformation, innovation',
        metrics: 'Digital adoption, modernization success, tech implementation',
        projectTypes: 'Digital transformation, modern web apps, tech solutions'
      }
    }

    const currentStyle = styleGuidelines[input.portfolioStyle as keyof typeof styleGuidelines] || styleGuidelines['Modern Tech']

    const prompt = `
Create a UNIQUE, ENTERPRISE-LEVEL portfolio for ${input.name} that is completely different from previous generations.

INPUT INFORMATION:
- Name: ${input.name}
- Career Summary: ${input.careerSummary}
- Skills: ${input.skills.join(', ')}
- Additional Info: ${input.additionalInfo || 'None provided'}

DESIGN PREFERENCES:
- Portfolio Style: ${input.portfolioStyle || 'Modern Tech'}
- Target Audience: ${input.targetAudience || 'Employers/Clients'}
- Design Reference: ${input.designReference || 'Modern and clean'}
- Color Preference: ${input.colorPreference || 'Professional colors'}
- Layout Style: ${input.layoutStyle || 'Standard'}

STYLE-SPECIFIC REQUIREMENTS for ${input.portfolioStyle}:
- Tone: ${currentStyle.tone}
- Focus Areas: ${currentStyle.focus}
- Key Metrics: ${currentStyle.metrics}
- Project Types: ${currentStyle.projectTypes}

CRITICAL UNIQUENESS REQUIREMENTS:
1. Generate COMPLETELY DIFFERENT content from previous portfolios - vary everything!
2. Use UNIQUE project names (avoid generic names like "E-commerce Platform")
3. Create DIVERSE company names and types (startups, enterprises, agencies, etc.)
4. Generate VARIED metrics and numbers (don't repeat same percentages/figures)
5. Use DIFFERENT technologies and skill combinations
6. Create UNIQUE testimonial names and feedback
7. Vary the career progression and experience levels
8. Use fresh, creative language and descriptions

CONTENT GENERATION REQUIREMENTS:
1. Create compelling headline (50-80 chars) matching the style tone
2. Enhance career summary with style-appropriate language and metrics
3. Generate 3-4 work experiences with:
   - UNIQUE company names (vary: startups, corporations, agencies, consultancies)
   - Progressive career growth with varied progression paths
   - Style-appropriate achievements and responsibilities
   - Different metrics and impact statements each time
4. Create 4-6 projects with:
   - CREATIVE, unique project names (avoid repetition!)
   - Style-appropriate project types and descriptions
   - Varied technology stacks and approaches
   - DIFFERENT metrics and impact measurements
   - Mix of professional and innovative projects
5. Professional statistics - use VARIED, realistic numbers
6. Generate relevant certifications and education for the style
7. Create authentic testimonials with varied feedback styles
8. Include style-appropriate service offerings
9. Ensure everything feels fresh, original, and matches the theme: ${selectedTheme}

THEME ASSIGNMENT: Use "${selectedTheme}" as the theme value

Return ONLY valid JSON in this exact structure:
{
  "headline": "Compelling professional headline with value proposition",
  "enhancedCareerSummary": "Enhanced, quantified career summary with specific achievements",
  "experience": [
    {
      "company": "Company Name",
      "position": "Job Title",
      "duration": "Jan 2020 - Present",
      "description": "Detailed description with quantified achievements and specific technologies"
    }
  ],
  "projects": [
    {
      "title": "Project Name",
      "description": "Detailed project description with problem solved, solution implemented, and quantified results",
      "technologies": ["Tech1", "Tech2", "Tech3", "Tech4"],
      "link": "https://project-demo.com",
      "metrics": "Specific metrics like '40% performance improvement' or '10K+ users'"
    }
  ],
  "stats": {
    "yearsExperience": "5+",
    "projectsCompleted": "200+",
    "clientsSatisfied": "50+",
    "codeCommits": "10K+"
  },
  "certifications": [
    {
      "name": "Certification Name",
      "issuer": "Organization",
      "year": "2023"
    }
  ],
  "education": [
    {
      "degree": "Degree Name",
      "institution": "University/School",
      "year": "2020",
      "details": "Relevant coursework or achievements"
    }
  ],
  "testimonials": [
    {
      "name": "Client/Colleague Name",
      "position": "Their Job Title",
      "company": "Their Company",
      "text": "Professional testimonial highlighting specific skills and results"
    }
  ],
  "services": [
    {
      "title": "Service Name",
      "description": "What this service includes and benefits",
      "features": ["Feature 1", "Feature 2", "Feature 3"]
    }
  ],
  "theme": "${selectedTheme}",
  "socialLinks": [
    {
      "platform": "LinkedIn",
      "url": "https://linkedin.com/in/${input.name.toLowerCase().replace(/\s+/g, '')}"
    },
    {
      "platform": "GitHub", 
      "url": "https://github.com/${input.name.toLowerCase().replace(/\s+/g, '')}"
    }
  ]
}
`

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert portfolio designer and content creator. Create advanced, professional portfolio content that matches modern design trends and user preferences. Always return valid JSON only."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 3000,
      })

      const content = response.choices[0].message.content
      if (!content) {
        throw new Error('No content received from OpenAI')
      }

      // Clean the response to ensure it's valid JSON
      const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim()
      return JSON.parse(cleanedContent)
    } catch (error) {
      console.error('Error generating portfolio data:', error)
      throw new Error('Failed to generate portfolio data. Please try again.')
    }
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  async createPortfolioDocument(input: PortfolioInput, generatedData: GeneratedPortfolioData) {
    const slug = this.generateSlug(input.name)
    
    return {
      _type: 'portfolio',
      name: input.name,
      slug: {
        current: slug,
        _type: 'slug'
      },
      headline: generatedData.headline,
      careerSummary: generatedData.enhancedCareerSummary,
      skills: input.skills,
      experience: generatedData.experience,
      projects: generatedData.projects,
      theme: generatedData.theme,
      email: input.email,
      phone: input.phone,
      location: input.location,
      socialLinks: generatedData.socialLinks || [],
      generatedAt: new Date().toISOString(),
    }
  }
} 