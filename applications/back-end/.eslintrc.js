const config = require('@boilerplate/_development/eslint.config.js')(__dirname)

module.exports = {
  ...config,
  rules: {
    ...config.rules,

    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        "assertionStyle": "angle-bracket"
      }
    ]
  }
}