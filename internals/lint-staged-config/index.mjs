export default {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '{!(package)*.json,*.code-snippets,.!(browserslist|npm)*rc}': ['prettier --write --parser json'],
  'package.json': ['prettier --write'],
  '*.vue': ['eslint --fix', 'prettier --write', 'stylelint --fix'],
  '*.{scss,css}': ['stylelint --fix', 'prettier --write'],
  '*.md': ['prettier --write'],
}
