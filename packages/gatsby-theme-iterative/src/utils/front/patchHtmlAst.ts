// Strange issue with srcSet value are without comma
const patchHtmlAst = (ast: any) => {
  if (ast.properties?.srcSet && Array.isArray(ast.properties.srcSet)) {
    ast.properties.srcSet = ast.properties.srcSet.join(', ')
  }
  if (ast.children) {
    ast.children = ast.children.map(patchHtmlAst)
  }
  return ast
}
export default patchHtmlAst
