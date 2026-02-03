import type { Linter } from 'eslint'

import * as parserTs from '@typescript-eslint/parser'
import pluginVue from 'eslint-plugin-vue'

export async function vue(): Promise<Linter.Config[]> {
  return [
    ...pluginVue.configs['flat/recommended'],

    {
      name: 'internals/eslint-config/vue',

      files: ['**/*.vue'],

      languageOptions: {
        parserOptions: {
          parser: parserTs,
        },
      },

      rules: {
        'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
        'vue/custom-event-name-casing': ['error', 'camelCase'],
        'vue/define-macros-order': ['error', { order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'] }],
        'vue/dot-location': ['error', 'property'],
        'vue/dot-notation': ['error', { allowKeywords: true }],
        'vue/eqeqeq': ['error', 'smart'],
        'vue/html-self-closing': ['error', { html: { component: 'always', normal: 'never', void: 'always' }, math: 'always', svg: 'always' }],
        'vue/multi-word-component-names': 'off',
        'vue/no-empty-pattern': 'error',
        'vue/no-extra-parens': ['error', 'functions'],
        'vue/no-irregular-whitespace': 'error',
        'vue/no-loss-of-precision': 'error',
        'vue/no-restricted-syntax': ['error', 'DebuggerStatement', 'LabeledStatement', 'WithStatement'],
        'vue/no-restricted-v-bind': ['error', '/^v-/'],
        'vue/no-sparse-arrays': 'error',
        'vue/no-unused-refs': 'error',
        'vue/no-useless-v-bind': 'error',
        'vue/no-v-html': 'off',
        'vue/prefer-separate-static-class': 'error',
        'vue/prefer-template': 'error',
        'vue/v-on-event-hyphenation': ['warn', 'always', { autofix: true, ignore: [] }],
      },
    },
  ]
}
