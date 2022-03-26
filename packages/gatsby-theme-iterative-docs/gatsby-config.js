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

module.exports = ({ simpleLinkerTerms, cssBase = defaultCssBase }) => {
  const postCssPlugins = [
    mixins(mixinsConfig),
    customMedia({ importFrom: mediaConfig }),
    customProperties({
      importFrom: [cssBase],
      disableDeprecationNotice: true
    }),
    nested,
    colorMod({
      importFrom: [cssBase]
    }),
    autoprefixer
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
        resolve: 'gatsby-plugin-manifest',
        options: {
          /* eslint-disable @typescript-eslint/naming-convention */
          background_color: '#eff4f8',
          display: 'minimal-ui',
          icon: 'static/favicon-512x512.png',
          name: 'example-website.com',
          short_name: 'example-website.com',
          start_url: '/',
          theme_color: '#eff4f8',
          icons: [
            {
              src: '/apple-touch-icon-48x48.png',
              sizes: '48x48',
              type: 'image/png'
            },
            {
              src: '/apple-touch-icon-72x72.png',
              sizes: '72x72',
              type: 'image/png'
            },
            {
              src: '/apple-touch-icon-96x96.png',
              sizes: '96x96',
              type: 'image/png'
            },
            {
              src: '/apple-touch-icon-144x144.png',
              sizes: '144x144',
              type: 'image/png'
            },
            {
              src: '/apple-touch-icon.png',
              sizes: '180x180',
              type: 'image/png'
            },
            {
              src: '/apple-touch-icon-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/apple-touch-icon-256x256.png',
              sizes: '256x256',
              type: 'image/png'
            },
            {
              src: '/apple-touch-icon-384x384.png',
              sizes: '384x384',
              type: 'image/png'
            },
            {
              src: '/apple-touch-icon-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
          /* eslint-enable @typescript-eslint/naming-convention */
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
