import { getPortfolioBySlug } from '@/lib/sanity'
import { PortfolioTemplate } from '@/components/PortfolioTemplate'
import { notFound } from 'next/navigation'

interface PortfolioPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PortfolioPageProps) {
  const portfolio = await getPortfolioBySlug(params.slug)
  
  if (!portfolio) {
    return {
      title: 'Portfolio Not Found',
    }
  }

  return {
    title: `${portfolio.name} - Portfolio`,
    description: portfolio.headline || portfolio.careerSummary,
    keywords: portfolio.skills.join(', '),
    openGraph: {
      title: `${portfolio.name} - Portfolio`,
      description: portfolio.headline || portfolio.careerSummary,
      type: 'profile',
    },
  }
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const portfolio = await getPortfolioBySlug(params.slug)

  if (!portfolio) {
    notFound()
  }

  return <PortfolioTemplate portfolio={portfolio} />
} 