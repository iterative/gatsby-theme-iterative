/* eslint-env node */

const dvc = require('./dvc-commands')
const cml = require('./cml-commands')
const mlem = require('./mlem-commands')
const Prism = require('prismjs')

Prism.languages.usage = {
  dvc: {
    pattern: new RegExp(`dvc (?:${dvc.join('|')})`)
  },
  cml: {
    pattern: new RegExp(`cml (?:${cml.join('|')})`)
  },
  mlem: {
    pattern: new RegExp(`mlem (?:${mlem.join('|')})`)
  },
  usage: {
    pattern: /(^|\n)\s*(usage|positional arguments|optional arguments)/
  },
  args: {
    pattern: /(?<=\[)(?:[^\]\[]+|\[(?:[^\]\[]+|\[[^\]\[]*\])*\])*(?=\])/,
    inside: {
      arg: {
        pattern: /\-{1,2}[^|]*/
      }
    }
  }
}
