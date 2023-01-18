const path = require('path')

module.exports = async (
  { getRemarkFileDependency, markdownNode, markdownAST },
  { staticFolderName = 'static' }
) => {
  if (!markdownNode.fileAbsolutePath) return
  const { visit } = await import('unist-util-visit')
  const baseDir = path.resolve(staticFolderName)
  const directory = path.dirname(markdownNode.fileAbsolutePath)

  const preprocessPromises = []

  const preprocessImageNode = async node => {
    if (
      node.type === 'image' &&
      !(node.url?.startsWith('http://') || node.url?.startsWith('https://'))
    ) {
      const { url } = node
      const imagePath = path.resolve(directory, path.join(baseDir, url))

      const imageNode = await getRemarkFileDependency({
        absolutePath: {
          eq: imagePath
        }
      })

      if (
        (!imageNode || !imageNode.absolutePath) &&
        process.env.NODE_ENV === `production`
      ) {
        throw new Error(
          `Image Not Found: Image "${url}" not found in folder "${staticFolderName}" referenced from "${markdownNode.fileAbsolutePath}". Please check static folder name and that file exists at "${staticFolderName}${url}".`
        )
      } else {
        const newUrl = path.relative(directory, path.join(baseDir, url))
        node.url = newUrl
      }
    }
  }

  visit(markdownAST, node => {
    preprocessPromises.push(preprocessImageNode(node))
  })

  await Promise.all(preprocessPromises)
}
