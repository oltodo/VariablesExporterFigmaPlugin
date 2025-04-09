import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  jsx: true,
  unicorn: true,
  formatters: {
    html: true,
    css: true,
  },
})
