const {
  getAllToolsSidebar
} = require('@dvcorg/gatsby-theme-iterative/src/utils/shared/sidebarUtils')
const dvcSidebar = require('./content/docs/sidebar.json')

const tools = [
  {
    name: 'dvc',
    data: dvcSidebar
  },
  {
    name: 'cml',
    repo: 'cml.dev',
    mainBranch: 'master'
  }
]

getAllToolsSidebar(tools)
