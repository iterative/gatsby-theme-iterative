/* eslint-env node */

const { createLinkNode } = require('./helpers')
const { getItemByPath } = require('../../src/utils/shared/sidebar')

const CLI_REGEXP = /(dvc|cml|mlem)\s+[a-z][a-z-.]*/

const COMMAND_REGEXP = /^[a-z][a-z-]*$/
const ARGS_REGEXP = new RegExp(/\-{1,2}[a-zA-Z-]*/, 'ig')

const COMMAND_ROOT = '/doc/command-reference/'
const CML_COMMAND_ROOT = '/doc/ref/'

module.exports = astNode => {
  const node = astNode[0]
  const parent = astNode[2]
  if (parent.type !== 'link' && CLI_REGEXP.test(node.value)) {
    const parts = node.value.split(/\s+/)
    const index = parts.findIndex(part => {
      const cli = String(part).trim()
      return cli === 'dvc' || cli === 'cml' || cli === 'mlem'
    })
    const cli = parts[index]
    const commandRoot = cli === 'cml' ? CML_COMMAND_ROOT : COMMAND_ROOT
    const command = parts[index + 1]
    const baseUrl = `${commandRoot}${command}`
    let url
    const isCommandPageExists = getItemByPath(baseUrl)
    if (isCommandPageExists) {
      url = baseUrl
      for (const arg of parts.slice(index + 2)) {
        if (arg && COMMAND_REGEXP.test(arg) && getItemByPath(`${url}/${arg}`)) {
          url = `${url}/${arg}`
        } else if (arg && ARGS_REGEXP.test(arg)) {
          const id = arg.match(ARGS_REGEXP)[0]
          url = `${url}#${id}`
          break
        }
      }
      createLinkNode(url, astNode)
    }
  }
  return astNode
}
