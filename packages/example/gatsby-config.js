module.exports = {
  trailingSlash: 'never',
  siteMetadata: {
    title: 'Example website',
    description: 'Example website description',
    keywords: ['docs', 'test'],
    siteUrl: 'http://localhost:8000'
  },
  plugins: [
    {
      resolve: `gatsby-theme-iterative-docs`,
      options: {
        simpleLinkerTerms: require('./content/docs/linked-terms')
      }
    }
  ]
}
