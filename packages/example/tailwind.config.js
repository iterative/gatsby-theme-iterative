const themeConfig = require('@dvcorg/gatsby-theme-iterative/tailwind.config')

module.exports = {
  ...themeConfig,
  content: [...themeConfig.content, './src/**/*']
}
