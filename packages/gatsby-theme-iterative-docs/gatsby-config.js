require("dotenv").config();
const path = require("path");

const nested = require("postcss-nested");
const autoprefixer = require("autoprefixer");
const customMedia = require("postcss-custom-media");
const customProperties = require("postcss-custom-properties");
const mixins = require("postcss-mixins");
const colorMod = require("postcss-color-mod-function");

const mediaConfig = require("./config/postcss/media");
const mixinsConfig = require("./config/postcss/mixins");

const cssBase = path.join(__dirname, "src", "components", "Page", "base.css");

const postCssPlugins = [
  mixins(mixinsConfig),
  customMedia({ importFrom: mediaConfig }),
  customProperties({
    importFrom: [cssBase],
  }),
  nested,
  colorMod({
    importFrom: [cssBase],
  }),
  autoprefixer,
];

const plugins = [
  {
    resolve: "gatsby-plugin-postcss",
    options: {
      postCssPlugins,
    },
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "content",
      path: path.resolve("content"),
    },
  },
  {
    resolve: "gatsby-transformer-remark",
    options: {
      plugins: [
        "gatsby-remark-embedder",
        {
          resolve: "gatsby-remark-prismjs",
          options: {
            noInlineHighlight: true,
            languageExtensions: [
              {
                language: "text",
                definition: {},
              },
            ],
          },
        },
        {
          resolve: "gatsby-remark-smartypants",
          options: {
            quotes: false,
          },
        },
        {
          resolve: "gatsby-remark-embed-gist",
          options: {
            includeDefaultCss: true,
          },
        },
        "gatsby-remark-relative-images",
        "gatsby-remark-copy-linked-files",
        "gatsby-remark-external-links",
        {
          resolve: "gatsby-remark-autolink-headers",
          options: {
            enableCustomId: true,
            isIconAfterHeader: true,
          },
        },
        {
          resolve: "gatsby-remark-images",
          options: {
            maxWidth: 700,
            withWebp: true,
            quality: 90,
          },
        },
        "gatsby-remark-responsive-iframe",
      ],
    },
  },
  {
    resolve: "gatsby-plugin-svgr",
    options: {
      ref: true,
    },
  },
  "gatsby-plugin-sharp",
];

module.exports = {
  plugins,
  siteMetadata: {
    author: "Iterative",
    siteUrl: "https://cml.dev",
  },
};
