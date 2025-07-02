export const portfolio = {
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'headline',
      title: 'Professional Headline',
      type: 'string',
      description: 'A short, catchy professional tagline'
    },
    {
      name: 'careerSummary',
      title: 'Career Summary',
      type: 'text',
      description: 'Professional background and experience summary'
    },
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of professional skills and technologies'
    },
    {
      name: 'experience',
      title: 'Work Experience',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'company',
            type: 'string',
            title: 'Company Name'
          },
          {
            name: 'position',
            type: 'string',
            title: 'Job Position'
          },
          {
            name: 'duration',
            type: 'string',
            title: 'Duration',
            description: 'e.g., "Jan 2020 - Present"'
          },
          {
            name: 'description',
            type: 'text',
            title: 'Job Description'
          }
        ]
      }]
    },
    {
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'title',
            type: 'string',
            title: 'Project Title'
          },
          {
            name: 'description',
            type: 'text',
            title: 'Project Description'
          },
          {
            name: 'technologies',
            type: 'array',
            of: [{type: 'string'}],
            title: 'Technologies Used'
          },
          {
            name: 'link',
            type: 'url',
            title: 'Project Link'
          },
          {
            name: 'github',
            type: 'url',
            title: 'GitHub Repository'
          },
          {
            name: 'metrics',
            type: 'string',
            title: 'Project Metrics/Results'
          }
        ]
      }]
    },
    {
      name: 'stats',
      title: 'Professional Statistics',
      type: 'object',
      fields: [
        {
          name: 'yearsExperience',
          type: 'string',
          title: 'Years of Experience'
        },
        {
          name: 'projectsCompleted',
          type: 'string',
          title: 'Projects Completed'
        },
        {
          name: 'clientsSatisfied',
          type: 'string',
          title: 'Clients Satisfied'
        },
        {
          name: 'codeCommits',
          type: 'string',
          title: 'Code Commits'
        }
      ]
    },
    {
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'name',
            type: 'string',
            title: 'Certification Name'
          },
          {
            name: 'issuer',
            type: 'string',
            title: 'Issuing Organization'
          },
          {
            name: 'year',
            type: 'string',
            title: 'Year Obtained'
          }
        ]
      }]
    },
    {
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'degree',
            type: 'string',
            title: 'Degree/Qualification'
          },
          {
            name: 'institution',
            type: 'string',
            title: 'Institution'
          },
          {
            name: 'year',
            type: 'string',
            title: 'Year'
          },
          {
            name: 'details',
            type: 'text',
            title: 'Additional Details'
          }
        ]
      }]
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'name',
            type: 'string',
            title: 'Name'
          },
          {
            name: 'position',
            type: 'string',
            title: 'Position'
          },
          {
            name: 'company',
            type: 'string',
            title: 'Company'
          },
          {
            name: 'text',
            type: 'text',
            title: 'Testimonial Text'
          }
        ]
      }]
    },
    {
      name: 'services',
      title: 'Services Offered',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'title',
            type: 'string',
            title: 'Service Title'
          },
          {
            name: 'description',
            type: 'text',
            title: 'Service Description'
          },
          {
            name: 'features',
            type: 'array',
            of: [{type: 'string'}],
            title: 'Service Features'
          }
        ]
      }]
    },
    {
      name: 'theme',
      title: 'Portfolio Theme',
      type: 'string',
      options: {
        list: [
          {title: 'Modern Dark', value: 'modern-dark'},
          {title: 'Minimal Light', value: 'minimal-light'},
          {title: 'Creative Gradient', value: 'creative-gradient'},
          {title: 'Professional Blue', value: 'professional-blue'}
        ]
      },
      initialValue: 'modern-dark'
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string'
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City, Country'
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'platform',
            type: 'string',
            title: 'Platform',
            options: {
              list: [
                {title: 'LinkedIn', value: 'LinkedIn'},
                {title: 'GitHub', value: 'GitHub'},
                {title: 'Twitter', value: 'Twitter'},
                {title: 'Portfolio', value: 'Portfolio'},
                {title: 'Other', value: 'Other'}
              ]
            }
          },
          {
            name: 'url',
            type: 'url',
            title: 'URL'
          }
        ]
      }]
    },
    {
      name: 'generatedAt',
      title: 'Generated At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'headline',
      media: 'image'
    }
  }
} 