module.exports = {
  '*.ts?(x)': () => 'tsc --noEmit --skipLibCheck',
  '*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint'],
  '*.md': 'prettier --write',
  '*.json': 'prettier --write',
  '*.css': 'prettier --write'
}
