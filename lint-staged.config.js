module.exports = {
  '*.ts?(x)': () => 'tsc --noEmit --skipLibCheck',
  '*.{js,jsx,ts,tsx}': ['prettier --check', 'eslint'],
  '*.md': 'prettier --check',
  '*.json': 'prettier --check',
  '*.css': 'prettier --check'
}
