const path = require('path')
const {
  name: themePackageName
} = require('../gatsby-theme-iterative/package.json')

module.exports = {
  trailingSlash: 'never',
  siteMetadata: {
    title: 'Example website',
    description: 'Example website description',
    keywords: ['docs', 'test'],
    siteUrl: 'http://localhost:8000',
    plausibleDomain: ''
  },
  plugins: [
    {
      resolve: themePackageName,
      options: {
        simpleLinkerTerms: require('./content/linked-terms')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'static', 'img')
      }
    },
    '@sentry/gatsby'
  ]
}
