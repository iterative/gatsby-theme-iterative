const path = require('path')
const { name: packageName } = require('./package.json')
const defaults = require('./config-defaults')

const defaultGetTemplate = (template, defaultTemplate) =>
  template
    ? require.resolve(path.resolve('src', 'templates', template + '.tsx'))
    : defaultTemplate

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    disable: Joi.boolean().default(Boolean(process.env.SKIP_DOCS)),
    getTemplate: Joi.function().default(() => defaultGetTemplate),
    defaultTemplate: Joi.string().default(
      require.resolve('./src/templates/doc.tsx')
    ),
    remark: Joi.boolean().default(true),
    filesystem: Joi.boolean().default(true),
    glossaryDirectory: Joi.string().default('docs/user-guide/basic-concepts'),
    simpleLinkerTerms: Joi.array().items(
      Joi.object({
        matches: Joi.string(),
        url: Joi.string()
      })
    ),
    cssBase: Joi.string(),
    customMediaConfig: Joi.object(),
    customPropertiesConfig: Joi.object(),
    colorModConfig: Joi.object(),
    postCssPlugins: Joi.array(),
    plausibleSrc: [Joi.string().optional(), Joi.allow(null)],
    plausibleAPI: [Joi.string().optional(), Joi.allow(null)],
    plausibleDomain: [Joi.string().optional(), Joi.allow(null)],
    argsLinkerPath: Joi.alternatives()
      .try(Joi.string(), Joi.array().items(Joi.string()))
      .default(defaults.argsLinkerPath)
  })
}

exports.createSchemaCustomization = async api => {
  const {
    actions: { createTypes },
    schema: { buildObjectType }
  } = api
  createTypes([
    buildObjectType({
      name: 'DocsPage',
      interfaces: ['Node'],
      fields: {
        template: 'String',
        title: 'String',
        description: 'String',
        slug: 'String',
        sourcePath: 'String'
      }
    }),
    buildObjectType({
      name: 'GlossaryEntry',
      interfaces: ['Node'],
      fields: {
        tooltip: {
          type: 'String!'
        },
        name: 'String!',
        match: '[String]'
      }
    }),
    buildObjectType({
      name: 'SiteSiteMetadata',
      fields: {
        author: 'String',
        siteUrl: 'String',
        titleTemplate: 'String',
        plausibleSrc: 'String',
        plausibleDomain: 'String',
        plausibleAPI: 'String'
      }
    })
  ])
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        [`${packageName}/sidebar$`]: require.resolve('./src/sidebar'),
        [`${packageName}/redirects$`]: require.resolve('./src/redirects')
      }
    }
  })
}

exports.createPages = require('./createPages.js')

exports.onCreateNode = require('./onCreateNode.js')
