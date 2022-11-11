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
    siteUrl: 'http://gatsby-theme-iterative-example.herokuapp.com'
  },
  plugins: [
    {
      resolve: themePackageName,
      options: {
        simpleLinkerTerms: require('./content/linked-terms'),
        plausibleSrc: null
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
