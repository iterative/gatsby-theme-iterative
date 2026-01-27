import { Element } from 'hast'
import camelCase from 'lodash/camelCase'

const parseStyleString = (styleString: string): Record<string, string> => {
  const style: Record<string, string> = {}

  for (const declaration of styleString.split(';')) {
    const [property, ...valueParts] = declaration.split(':')
    if (!property?.trim() || !valueParts.length) continue

    const key = camelCase(property.trim())
    const value = valueParts.join(':').trim()
    if (key && value) {
      style[key] = value
    }
  }

  return style
}

const patchHtmlAst = (ast: Element): Element => {
  if (ast.properties?.srcSet && Array.isArray(ast.properties.srcSet)) {
    ast.properties.srcSet = ast.properties.srcSet.join(', ')
  }

  if (ast.properties?.style && typeof ast.properties.style === 'string') {
    // HAST types style as string, but React requires an object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(ast.properties as any).style = parseStyleString(ast.properties.style)
  }

  if (ast.children) {
    ast.children = (ast.children as Element[]).map(patchHtmlAst)
  }

  return ast
}

export default patchHtmlAst
