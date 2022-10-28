require('dotenv').config()
const fs = require('fs')
const path = require('path')

const autoprefixer = require('autoprefixer')

const customYoutubeTransformer = require('./config/gatsby-remark-embedder/custom-yt-embedder')

const linkIcon = fs
  .readFileSync(path.join(__dirname, 'src', 'images', 'linkIcon.svg'))
  .toString()

require('./config/prismjs/dvc')
require('./config/prismjs/usage')
require('./config/prismjs/dvctable')

const imageMaxWidth = 700

const defaults = require('./config-defaults')

module.exports = ({
  simpleLinkerTerms,
  postCssPlugins = [
    require('tailwindcss/nesting')(require('postcss-nested')),
    autoprefixer,
    require('tailwindcss')
  ],
  docsInstanceName = defaults.docsInstanceName,
  docsPath = defaults.docsPath,
  glossaryInstanceName = defaults.glossaryInstanceName,
  glossaryPath = defaults.glossaryPath,
  argsLinkerPath = defaults.argsLinkerPath
}) => ({
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        allExtensions: true
      }
    },
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    glossaryInstanceName && {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: glossaryInstanceName,
        path: glossaryPath
      }
    },
    docsInstanceName && {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: docsInstanceName,
        path: docsPath
      }
    },
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-embedder',
            options: {
              customTransformers: [customYoutubeTransformer]
            }
          },
          {
            resolve: require.resolve('./plugins/gatsby-remark-dvc-linker'),
            options: {
              simpleLinkerTerms
            }
          },
          {
            resolve: require.resolve('./plugins/gatsby-remark-args-linker'),
            options: {
              icon: linkIcon,
              // Pathname can also be array of paths. eg: ['docs/command-reference;', 'docs/api']
              pathname: argsLinkerPath
            }
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true,
              languageExtensions: [
                {
                  language: 'text',
                  definition: {}
                }
              ]
            }
          },
          {
            resolve: 'gatsby-remark-smartypants',
            options: {
              quotes: false
            }
          },
          {
            resolve: 'gatsby-remark-embed-gist',
            options: {
              includeDefaultCss: true
            }
          },
          'gatsby-remark-relative-images',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-external-links',
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              enableCustomId: true,
              isIconAfterHeader: true,
              icon: linkIcon
            }
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: imageMaxWidth,
              withWebp: true,
              quality: 90,
              loading: 'auto'
            }
          },
          'gatsby-remark-responsive-iframe',
          require.resolve('./plugins/resize-image-plugin'),
          require.resolve('./plugins/external-link-plugin')
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        ref: true
      }
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          placeholder: 'blurred'
        }
      }
    }
  ].filter(Boolean),
  siteMetadata: {
    author: 'Iterative',
    siteUrl: 'https://example.com',
    titleTemplate: ''
  }
})
