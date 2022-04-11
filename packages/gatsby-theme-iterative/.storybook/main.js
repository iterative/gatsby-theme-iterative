const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-gatsby',
    {
      name: '@storybook/addon-postcss',
      options: {
        styleLoaderOptions: {
          modules: {
            namedExport: true
          }
        },
        cssLoaderOptions: {
          modules: {
            mode: 'local',
            auto: true,
            localIdentName: '[name]__[local]__[hash:base64:5]'
          }
        },
        postcssLoaderOptions: {
          implementation: require('postcss')
        }
      }
    }
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5'
  },
  typescript: {
    reactDocgen: false
  },
  webpackFinal: config => {
    const svgRule = config.module.rules.find(rule =>
      String(rule.test).includes('svg')
    )
    svgRule.test = new RegExp(String(svgRule.test).replace(/svg\|/, ''))
    config.module.rules.unshift({
      test: /\.svg$/,
      type: 'javascript/auto',
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            exportType: 'named',
            ref: true
          }
        },
        'url-loader'
      ]
    })

    config.module.rules.push({
      test: /\.(sa|sc)ss$/,
      use: [
        {
          loader: 'style-loader',
          options: {
            modules: {
              namedExport: true
            }
          }
        },
        {
          loader: 'css-loader',
          options: {
            modules: {
              mode: 'local',
              auto: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
              exportLocalsConvention: 'dashesOnly',
              namedExport: true
            }
          }
        },
        'postcss-loader',
        'sass-loader'
      ],
      include: path.resolve(__dirname, '../')
    })

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@dvcorg/gatsby-theme-iterative/sidebar':
          '@dvcorg/gatsby-theme-iterative/src/sidebar',
        '@dvcorg/gatsby-theme-iterative/redirects':
          '@dvcorg/gatsby-theme-iterative/src/redirects'
      }
    }
    return config
  }
}
