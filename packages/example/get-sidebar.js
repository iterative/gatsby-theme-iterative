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
    // Or, we can also simply use url to sidebar.json file
    // url: 'https://raw.githubusercontent.com/iterative/cml.dev/master/content/docs/sidebar.json'
    repo: 'cml.dev',
    mainBranch: 'master'
  }
]

getAllToolsSidebar(tools)
