import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
// 1. On importe le fichier qu'on vient de créer
import post from './schemaTypes/post'

export default defineConfig({
  name: 'default',
  title: 'RIM CMS',

  projectId: 'g9fpbcny', 
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    // 2. On l'ajoute à la liste des types
    types: [post], 
  },
})