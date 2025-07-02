import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemas'

export default defineConfig({
  name: 'ai-portfolio-generator',
  title: 'AI Portfolio Generator',
  
  projectId: '59spmwb5',
  dataset: 'production',
  
  plugins: [deskTool(), visionTool()],
  
  schema: {
    types: schemaTypes,
  },
}) 