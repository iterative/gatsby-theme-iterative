## Usage

### Options

- disable: boolean

  Default: Boolean(process.env.SKIP_DOCS)

  Stops this theme from making pages. Could be used as a conditional for test
  and development purposes.

- defaultTemplate: string

  Default: require.resolve('./src/templates/doc.tsx')

  Will be passed to the `getTemplate` function to use as a default template, the
  default function simply uses it if `template` isn't specified.

- getTemplate: function

  Default:

  ```ts
  const defaultGetTemplate = (template, defaultTemplate) =>
    template
      ? require.resolve(path.resolve('src', 'templates', template + '.tsx'))
      : defaultTemplate
  ```

  This function will be used to

- remark: boolean

  Default: true

  if true, this theme will add its own instance of `gatsby-transformer-remark`.

- filesystem: boolean

  Default: true

  if true, this theme will add its own instance of `gatsby-source-filesystem`.

- glossaryPath: string

  Default: path.resolve('content', 'docs', 'user-guide', 'basic-concepts')

- simpleLinkerTerms: { matches: string, url: string }[]

  Default: undefined

  These terms will be passed to `plugins/gatsby-remark-dvc-linker`, which will
  scan code blocks for ones with content matching `matches`, and then link it to
  that entry's `url`.

- postCssPlugins: Plugin[]

  Default:

  ```js
  ;[
    require('tailwindcss/nesting')(require('postcss-nested')),
    autoprefixer,
    require('tailwindcss')
  ]
  ```

  If specified, this array will completely replace plugins this theme passes to
  PostCSS. This is mostly an escape hatch for if styles are broken with the
  default plugins. Check out
  [the theme's `gatsby-config`](https://github.com/iterative/gatsby-theme-iterative/blob/main/packages/gatsby-theme-iterative/gatsby-config.js)
  to see the default plugins, as not having them in this option will very likely
  break core functionality.

- docsInstanceName: string

  Default: 'iterative-docs'

  The `name` that will be passed to the `gatsby-source-filesystem` instance for
  docs pages. The resulting `sourceInstanceName` will be used to identify files
  that will be processed as docs pages.

- docsPath: string

  Default: path.resolve('content', 'docs')

- glossaryInstanceName: string

  Default: 'iterative-glossary'

  The `name` that will be passed to the `gatsby-source-filesystem` instance for
  glossary entries. The resulting `sourceInstanceName` will be used to identify
  files that will be processed as glossary pages.

- argsLinkerPath: string

  Default: ['command-reference', `ref`, 'cli-reference']

  The path that `plugins/gatsby-remark-args-linker` will operate on, connecting
  arguments listed in the summary with their summaries deeper in the page.

- docsPrefix: string

  Default: 'doc'

  This is the prefix that the docs pages will render to, including the index
  page at the exact path.

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
