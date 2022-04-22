require('dotenv').config()
const fs = require('fs')
const path = require('path')

const nested = require('postcss-nested')
const autoprefixer = require('autoprefixer')
const customMedia = require('postcss-custom-media')
const customProperties = require('postcss-custom-properties')
const mixins = require('postcss-mixins')
const colorMod = require('postcss-color-mod-function')

const mediaConfig = require('./config/postcss/media')
const mixinsConfig = require('./config/postcss/mixins')

const defaultCssBase = path.join(
  __dirname,
  'src',
  'components',
  'Page',
  'base.css'
)

const customYoutubeTransformer = require('./config/gatsby-remark-embedder/custom-yt-embedder')

const linkIcon = fs
  .readFileSync(path.join(__dirname, 'src', 'images', 'linkIcon.svg'))
  .toString()

require('./config/prismjs/dvc')
require('./config/prismjs/usage')
require('./config/prismjs/dvctable')

const imageMaxWidth = 700

module.exports = ({
  simpleLinkerTerms,
  cssBase = defaultCssBase,
  customMediaConfig = { importFrom: [mediaConfig] },
  customPropertiesConfig = {
    importFrom: [cssBase],
    disableDeprecationNotice: true
  },
  colorModConfig = {
    importFrom: [cssBase]
  }
}) => {
  const postCssPlugins = [
    require('tailwindcss/nesting')(require('postcss-nested')),
    customMedia(customMediaConfig),
    mixins(mixinsConfig),
    customProperties(customPropertiesConfig),
    colorMod(colorModConfig),
    autoprefixer,
    require('tailwindcss')
  ]

  return {
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
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'content',
          path: path.resolve('content')
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
                pathname: 'docs/command-reference'
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
      },
      {
        resolve: 'gatsby-plugin-sentry',
        options: {
          dsn: process.env.SENTRY_DSN,
          environment: process.env.NODE_ENV,
          release: process.env.SOURCE_VERSION,
          enabled: process.env.NODE_ENV === 'production',
          ignoreErrors: [
            /* When we deploy new version we delete assets which were generated for
        the previous deployed version, but users can have opened old version in 
        their browsers. If they hover some link on the page Gatsby.js will try
        fetch old chunks and will get ChunkLoadError, but then will load static
        page from the new deployed version and all will be ok. So we can just
        ignore these type of errors */
            'ChunkLoadError'
          ],
          /* There are some common urls which recomment to ignore. It's even 
      mentioned in the official documentation: https://docs.sentry.io/platforms/javascript/#decluttering-sentry
      In our case we just ignore all errors from the browser's extensions,
      because we can't influence on then somehow. */
          blacklistUrls: [/extensions\//i, /^chrome:\/\//i]
        }
      }
    ],
    siteMetadata: {
      author: 'Iterative',
      siteUrl: 'https://cml.dev'
    }
  }
}
