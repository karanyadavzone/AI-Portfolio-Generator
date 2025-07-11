# 🚀 AI Portfolio Generator

An intelligent portfolio generation platform that creates stunning, professional portfolios using AI in seconds. Built with Next.js 14, Sanity CMS, and OpenAI.

## ✨ Features

- **AI-Powered Generation**: Creates professional portfolios from minimal user input
- **Multiple Themes**: 4 beautiful, responsive portfolio themes
- **Dynamic Routing**: Each portfolio gets its own unique URL
- **Gallery View**: Browse all generated portfolios
- **SEO Optimized**: Perfect metadata and social sharing
- **Responsive Design**: Works beautifully on all devices
- **Real-time Updates**: Powered by Sanity's real-time capabilities

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **CMS**: Sanity
- **AI**: OpenAI GPT-4
- **UI Components**: Lucide React, React Hook Form
- **Styling**: Tailwind CSS with custom animations
- **Deployment**: Vercel-ready

## 🎨 Portfolio Themes

1. **Modern Dark** - Perfect for developers and tech professionals
2. **Minimal Light** - Clean design for consultants and business professionals
3. **Creative Gradient** - Eye-catching for creative professionals and designers
4. **Professional Blue** - Corporate-friendly for finance and healthcare professionals

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key
- Sanity account

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd ai-portfolio-generator
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token
```

### 3. Set Up Sanity

1. Install Sanity CLI: `npm install -g @sanity/cli`
2. Create a new Sanity project: `sanity init`
3. Copy your project ID and dataset name to your `.env.local`
4. Generate an API token with write access from your Sanity dashboard
5. Update your Sanity project with the schema:

```bash
# In your Sanity project directory
sanity schema deploy
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
ai-portfolio-generator/
├── app/
│   ├── page.tsx                 # Landing page with form
│   ├── portfolios/
│   │   ├── page.tsx            # Portfolio gallery
│   │   └── [slug]/
│   │       └── page.tsx        # Individual portfolio pages
│   ├── api/
│   │   └── generate-portfolio/
│   │       └── route.ts        # AI generation endpoint
│   └── globals.css             # Global styles
├── components/
│   ├── PortfolioCard.tsx       # Portfolio gallery cards
│   └── PortfolioTemplate.tsx   # Portfolio display templates
├── lib/
│   ├── sanity.ts              # Sanity client and utilities
│   └── ai-agent.ts            # OpenAI integration
├── sanity/
│   └── schemas/
│       ├── portfolio.ts       # Portfolio schema
│       └── index.ts          # Schema exports
└── package.json
```

## 🎯 How It Works

1. **User Input**: Users fill out a simple form with:
   - Full name
   - Career summary
   - Skills (comma-separated)
   - Optional contact information

2. **AI Generation**: The system uses OpenAI GPT-4 to:
   - Enhance the career summary
   - Generate realistic work experiences
   - Create relevant projects with descriptions
   - Select the most appropriate theme
   - Add professional social links

3. **Storage**: Generated portfolio data is saved to Sanity CMS

4. **Display**: Each portfolio gets a unique URL and is displayed using one of four beautiful themes

5. **Gallery**: All portfolios are showcased in a responsive gallery view

## 🎨 Customization

### Adding New Themes

1. Create a new theme component in `components/PortfolioTemplate.tsx`
2. Add the theme to the `portfolioThemes` object
3. Update the Sanity schema to include the new theme option
4. Update the AI prompt to recognize the new theme

### Modifying AI Prompts

Edit the prompt in `lib/ai-agent.ts` to:
- Change the tone or style of generated content
- Add new fields or sections
- Modify the portfolio structure

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app is a standard Next.js application and can be deployed to any platform that supports Node.js.

## 📊 Features Roadmap

- [ ] **MCP Integration**: Add Model Context Protocol support
- [ ] **Image Generation**: AI-generated profile pictures and project images
- [ ] **PDF Export**: Generate downloadable PDF versions
- [ ] **Custom Domains**: Allow users to use custom domains
- [ ] **Analytics Dashboard**: Track portfolio views and engagement
- [ ] **Template Builder**: Visual theme customization tool
- [ ] **Collaboration**: Multi-user portfolio editing
- [ ] **SEO Analysis**: Built-in SEO recommendations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/ai-portfolio-generator/issues) page
2. Create a new issue if your problem isn't already reported
3. Include as much detail as possible in your issue report

## 🙏 Acknowledgments

- OpenAI for the powerful GPT-4 API
- Sanity for the excellent headless CMS
- Vercel for seamless deployment
- The Next.js team for the amazing framework

---

**Built with ❤️ and AI** #   A I - P o r t f o l i o - G e n e r a t o r  
 