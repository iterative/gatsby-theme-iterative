const path = require('path')
const {
  name: themePackageName
} = require('../gatsby-theme-iterative/package.json')

module.exports = {
  jsxRuntime: 'automatic',
  siteMetadata: {
    title: 'Example website',
    description: 'Example website description',
    keywords: ['docs', 'test'],
    siteUrl: 'http://gatsby-theme-iterative-example.herokuapp.com'
  },
  plugins: [
    'gatsby-plugin-sharp',
    {
      resolve: themePackageName,
      options: {
        simpleLinkerTerms: require('./content/linked-terms'),
        plausibleSrc: null,
        sentry: false
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'static', 'img')
      }
    }
  ]
}
