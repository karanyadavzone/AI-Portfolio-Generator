import { NextRequest, NextResponse } from 'next/server'
import { PortfolioAIAgent } from '@/lib/ai-agent'
import { sanityClient } from '@/lib/sanity'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.careerSummary || !body.skills) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check environment variables
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured. Please set OPENAI_API_KEY in your environment variables.' },
        { status: 500 }
      )
    }

    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      return NextResponse.json(
        { error: 'Sanity is not configured. Please set NEXT_PUBLIC_SANITY_PROJECT_ID in your environment variables.' },
        { status: 500 }
      )
    }

    // Initialize AI agent
    const aiAgent = new PortfolioAIAgent()
    
    // Generate portfolio data with AI
    const generatedData = await aiAgent.generatePortfolioData({
      name: body.name,
      careerSummary: body.careerSummary,
      skills: body.skills,
      email: body.email,
      phone: body.phone,
      location: body.location,
      additionalInfo: body.additionalInfo,
    })

    // Create Sanity document
    const portfolioDocument = await aiAgent.createPortfolioDocument(
      {
        name: body.name,
        careerSummary: body.careerSummary,
        skills: body.skills,
        email: body.email,
        phone: body.phone,
        location: body.location,
        additionalInfo: body.additionalInfo,
      },
      generatedData
    )

    // Save to Sanity
    const result = await sanityClient.create(portfolioDocument)
    
    return NextResponse.json({
      success: true,
      slug: result.slug.current,
      portfolioId: result._id,
    })
    
  } catch (error: any) {
    console.error('Error generating portfolio:', error)
    
    // Return specific error messages
    if (error.message?.includes('OpenAI API key')) {
      return NextResponse.json(
        { error: 'OpenAI API configuration error. Please check your API key.' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to generate portfolio. Please try again.' },
      { status: 500 }
    )
  }
} 