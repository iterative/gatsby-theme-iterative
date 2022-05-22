const fs = require('fs')
require('isomorphic-fetch')

const args = process.argv.slice(2)
const tool = args[0] || 'dvc'

const paths = ['command-reference', 'cli-reference', 'ref']

const getUrl = repo => {
  return `https://raw.githubusercontent.com/iterative/${repo}/master/content/docs/sidebar.json`
}

const writeCommandsToFile = async commands => {
  const file = `${__dirname}/${tool}-commands.js`

  const start = '/* eslint-env node */\n\nmodule.exports = [\n'
  const end = ']\n'
  const content =
    start + `${commands.map(cmd => `  '${cmd}'`).join(',\n')}\n` + end

  fs.writeFileSync(file, content)
}

const getCommands = async url => {
  const res = await fetch(url)
  const sidebar = await res.json()
  const cmdRef = sidebar.find(item => paths.includes(item.slug))
  if (!cmdRef) {
    throw new Error(`Could not find command reference in sidebar.json`)
  }
  const commands = []
  cmdRef.children.forEach(item => {
    const { label, children } = item
    if (Array.isArray(children)) {
      children.forEach(subitem => {
        const { label } = subitem
        commands.push(label)
      })
    }
    commands.push(label)
  })

  writeCommandsToFile(commands)
}

switch (tool) {
  case 'dvc':
    {
      const url = getUrl('dvc.org')
      getCommands(url).catch(err => {
        console.error(err)
      })
    }
    break
  case 'cml':
    {
      const url = getUrl('cml.dev')
      getCommands(url).catch(err => {
        console.error(err)
      })
    }
    break
  case 'mlem':
    {
      const url = getUrl('mlem.ai')
      getCommands(url).catch(err => {
        console.error(err)
      })
    }
    break
  default:
    break
}
