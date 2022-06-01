/** HAST - Hypertext Abstract Syntax Tree */
async function convertHtmlToHast(htmlString) {
  try {
    const { unified } = await import('unified')
    const parse = (await import('rehype-parse')).default
    return unified().use(parse, { fragment: true }).parse(htmlString)
  } catch (error) {
    console.error(error)
  }
}

async function convertHastToHtml(htmlAst) {
  try {
    const { unified } = await import('unified')
    const stringify = (await import('rehype-stringify')).default
    return unified().use(stringify).stringify(htmlAst)
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  convertHastToHtml,
  convertHtmlToHast
}
