const path = require('path')

module.exports = async (
  { markdownNode, markdownAST },
  { baseDir = path.resolve('static') }
) => {
  if (!markdownNode.fileAbsolutePath) return
  const { visit } = await import('unist-util-visit')

  const directory = path.dirname(markdownNode.fileAbsolutePath)

  // Process all markdown image nodes
  visit(markdownAST, node => {
    if (node.type === 'image') {
      const { url } = node
      const newUrl = path.relative(directory, path.join(baseDir, url))
      node.url = newUrl
    }
  })
}
