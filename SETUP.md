# Quick Setup Guide

Follow these steps to get your AI Portfolio Generator running:

## 1. Install Dependencies
```bash
npm install
```

## 2. Set Up Environment Variables
Create `.env.local` file:
```bash
cp environment-variables.md .env.local
```

Then fill in your API keys:
- **OpenAI API Key**: Get from [OpenAI Platform](https://platform.openai.com/api-keys)
- **Sanity Project ID**: Get from [Sanity Dashboard](https://sanity.io/manage)
- **Sanity API Token**: Create in Sanity project settings → API

## 3. Set Up Sanity
```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Create new Sanity project (or use existing)
sanity init

# Copy your project details to .env.local
```

## 4. Deploy Sanity Schema
In your Sanity studio, add the schema from `sanity/schemas/portfolio.ts` and deploy it.

## 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 6. Test the Application
1. Fill out the portfolio form
2. Watch AI generate a beautiful portfolio
3. Check the portfolio gallery
4. View individual portfolio pages

## Troubleshooting

### Common Issues:
- **"OpenAI API Error"**: Check your API key and ensure you have credits
- **"Sanity Connection Error"**: Verify project ID and API token
- **"Build Errors"**: Ensure all dependencies are installed

### Getting Help:
- Check the main README.md for detailed instructions
- Review environment-variables.md for setup details
- Create an issue if you encounter problems

## What's Next?
- Customize portfolio themes
- Modify AI prompts
- Add new features
- Deploy to production 