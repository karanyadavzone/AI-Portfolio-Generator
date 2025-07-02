# Environment Variables Setup

Create a `.env.local` file in your project root with the following variables:

## Required Variables

### OpenAI Configuration
```env
OPENAI_API_KEY=your_openai_api_key_here
```
**How to get it:**
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and paste it here

### Sanity Configuration
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token
```

**How to get Sanity credentials:**

1. **Project ID & Dataset:**
   - Go to [Sanity.io](https://sanity.io/)
   - Create a new project or use existing one
   - Find your Project ID in the project settings
   - Dataset is typically "production" (default)

2. **API Token:**
   - In your Sanity project dashboard
   - Go to Settings → API
   - Click "Add API token"
   - Give it a descriptive name (e.g., "AI Portfolio Generator")
   - Set permissions to "Editor" or "Admin"
   - Copy the generated token

## Setting up Sanity Schema

1. In your Sanity Studio, go to the schema section
2. Add the portfolio schema from `sanity/schemas/portfolio.ts`
3. Deploy the schema changes

## Environment File Template

Copy this template to your `.env.local` file:

```env
# OpenAI API Key
OPENAI_API_KEY=

# Sanity Configuration  
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Optional: For development
NODE_ENV=development
```

## Security Notes

- Never commit `.env.local` to version control
- The `.env.local` file is already included in `.gitignore`
- For production deployment, set these as environment variables in your hosting platform
- Sanity API tokens should have minimal required permissions 