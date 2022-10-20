const sidebarArr = require('@dvcorg/gatsby-theme-iterative/sidebar')
const path = require('path')
const fs = require('fs')
const fetch = require('isomorphic-fetch')

const availableTools = (sidebarArr || [])
  .filter(item => item.local)
  .map(item => item.name)

const getToolsBaseUrl = cli => {
  if (availableTools.includes(cli)) return ''
  switch (cli) {
    case 'dvc':
      return 'https://dvc.org'
    case 'cml':
      return 'https://cml.dev'
    case 'mlem':
      return 'https://mlem.ai'
    default:
      return ''
  }
}

const getSideBarUrl = (repo, mainBranch = 'main') => {
  return `https://raw.githubusercontent.com/iterative/${repo}/${mainBranch}/content/docs/sidebar.json`
}

const getSidebar = async tool => {
  try {
    let url = tool.url
    if (!url) url = getSideBarUrl(tool.repo, tool.mainBranch)
    const res = await fetch(url)
    const sidebar = await res.json()
    return sidebar
  } catch (error) {
    console.error(
      `Error getting sidebar.json for ${tool.name} from repo ${tool.repo} branch ${tool.mainBranch}`
    )
    console.error(error)
    //skipping
    return []
  }
}

const writeSidebarToFile = allSidebar => {
  const dir = 'tmp'
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  const file = path.join(dir, 'sidebar.json')
  const content = JSON.stringify(allSidebar, null, 2)
  fs.writeFileSync(file, content)
}

const getAllToolsSidebar = async tools => {
  let allSidebar = []

  for (const tool of tools) {
    if (tool.data) {
      tool.local = true
      allSidebar = allSidebar.concat(tool)
    } else {
      const sidebar = await getSidebar(tool)
      tool.data = sidebar
      allSidebar = allSidebar.concat(tool)
    }
  }
  writeSidebarToFile(allSidebar)
}

module.exports = {
  getToolsBaseUrl,
  getSideBarUrl,
  getSidebar,
  writeSidebarToFile,
  getAllToolsSidebar
}
