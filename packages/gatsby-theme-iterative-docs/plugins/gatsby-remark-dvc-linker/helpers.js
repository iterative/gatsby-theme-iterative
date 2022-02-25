// We do not need to consider the position of the AST nodes
const buildAst = async mdToBuild => {
  const { unified } = await import('unified')
  const remarkHtml = await import('remark-html')
  const remarkParse = await import('remark-parse')
  const removePosition = await import('unist-util-remove-position')

  return removePosition(
    unified().use(remarkHtml).use(remarkParse).parse(mdToBuild)
  )
}

const createLinkNode = (url, [node, index, parent]) =>
  url &&
  (parent.children[index] = {
    type: 'link',
    url,
    title: null,
    children: [node],
    position: node.position
  })

module.exports = { buildAst, createLinkNode }
