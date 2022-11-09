const themeConfig = require('@dvcorg/gatsby-theme-iterative/tailwind.config')

module.exports = {
  ...themeConfig,
  content: [...themeConfig.content, './src/**/*'],
  theme: {
    ...themeConfig.theme,
    fontFamily: {
      sans: ['Tahoma', 'Arial', 'sans-serif'],
      mono: ['Consolas', '"Liberation Mono"', 'Menlo', 'Courier', 'monospace']
    }
  }
}
