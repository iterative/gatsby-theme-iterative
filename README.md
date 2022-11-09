# Gatsby Theme: Iterative

This Gatsby Theme houses the shared website code for all websites for
[Iterative](https://iterative.ai). This package is currently purpose-built
specifically for our websites and not very useful outside of them, but we intend
to change that as we make improvements and iron out issues!

## Usage

### Options

- disable: boolean Default: Boolean(process.env.SKIP_DOCS)

- getTemplate: function Default: () => defaultGetTemplate

- defaultTemplate: string Default: require.resolve('./src/templates/doc.tsx')

- remark: boolean Default: true

- filesystem: boolean Default: true

- glossaryDirectory: string Default: 'docs/user-guide/basic-concepts'

- simpleLinkerTerms: { matches: string, url: string }[] These terms will be
  passed to the simpleLinker remark plugin

- cssBase: string Used as base files for global PostCSS variables and queries

- customMediaConfig: object config passed to `postcss-custom-media`

- customPropertiesConfig: object config passed to `postcss-custom-properties`

- colorModConfig: object config passed to `postcss-color-mod`

- postCssPlugins: Plugin[] If specified, this array will completely replace
  plugins this theme passes to PostCSS. This is mostly an escape hatch for if
  styles are broken with the default plugins. Check out
  [the theme's `gatsby-config`](https://github.com/iterative/gatsby-theme-iterative/blob/main/packages/gatsby-theme-iterative/gatsby-config.js)
  to see the default plugins, as not having them in this option will very likely
  break core functionality.

### Examples

See this example from
[the example website's `gatsby-config.js`](https://github.com/iterative/gatsby-theme-iterative/blob/main/packages/example/gatsby-config.js).

```js
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
    siteUrl: 'http://localhost:8000'
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
```
