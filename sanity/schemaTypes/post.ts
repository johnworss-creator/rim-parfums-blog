import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Article de Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de l\'article',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL de la page)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Image Principale',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Contenu de l\'article',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image'}
      ],
    }),
  ],
})