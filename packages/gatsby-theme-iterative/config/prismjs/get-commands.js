const fs = require('fs')
require('isomorphic-fetch')

const args = process.argv.slice(2)
const tool = args[0] || 'dvc'

const repoList = {
  dvc: { repo: 'dvc.org', branch: 'main' },
  cml: { repo: 'cml.dev', branch: 'master' },
  mlem: { repo: 'mlem.ai', branch: 'main' }
}

const paths = ['command-reference', 'cli-reference', 'ref']

const getUrl = (repo, branch = 'main') => {
  return `https://raw.githubusercontent.com/iterative/${repo}/${branch}/content/docs/sidebar.json`
}

const writeCommandsToFile = async (commands, tool) => {
  const file = `${__dirname}/${tool}-commands.js`

  const start = 'module.exports = [\n'
  const end = ']\n'
  const content =
    start + `${commands.map(cmd => `  '${cmd}'`).join(',\n')}\n` + end

  fs.writeFileSync(file, content)
}

const getCommands = async tool => {
  const url = getUrl(repoList[tool].repo, repoList[tool].branch)
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

  writeCommandsToFile(commands, tool)
}

switch (tool) {
  case 'dvc':
  case 'cml':
  case 'mlem':
    {
      getCommands(tool).catch(err => {
        console.error(err)
      })
    }
    break
  case 'all': {
    // dvc
    getCommands('dvc').catch(err => {
      console.error(err)
    })
    // cml
    getCommands('cml').catch(err => {
      console.error(err)
    })
    // mlem
    getCommands('mlem').catch(err => {
      console.error(err)
    })
  }
  default:
    break
}
