module.exports = {
  extends: [
    'eslint:recommended', 'plugin:solid/typescript'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  plugins: ['solid'],
  rules: {
    "solid/reactivity": "warn",
    "solid/no-destructure": "warn",
    "solid/jsx-no-undef": "error"
  },
}
