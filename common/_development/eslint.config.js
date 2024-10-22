module.exports = (tsconfigRootDir) => ({
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "import", "jest", "todo-plz", "promise", "redux-saga"],
  "extends": [
    "eslint:recommended",
    "airbnb-typescript/base",
    // "plugin:node/recommended",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "plugin:promise/recommended",
    "plugin:anti-trojan-source/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:redux-saga/recommended",
  ],
  "parserOptions": {
    project: "tsconfig.json",
    tsconfigRootDir,
    sourceType: "module",
  },
  "ignorePatterns": [],
  "rules": {
    "@typescript-eslint/no-empty-interface": "off",
    // "node/no-unsupported-features/es-syntax": ["error", { "ignores": ["modules"] }],
    "node/no-missing-import": ["off"],
    "node/no-extraneous-import": ["off"],
    "node/no-extraneous-require": ["off"],
    "node/no-unpublished-import": ["off"],
    "prettier/prettier": "error",
    "linebreak-style": ["error", "unix"],
    "class-methods-use-this": "off",
    "comma-dangle": ["off"],
    "no-duplicate-imports": "error",
    "no-redeclare": "error",
    "space-before-blocks": "error",
    "space-infix-ops": "error",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "eol-last": ["error", "always"],
    "import/no-relative-parent-imports": "error",
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type", "unknown"],
        "pathGroups": [
          {
            "pattern": "@boilerplate/_development/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "react",
            "group": "external",
            "position": "before"
          },
          {
            "pattern": "react/**",
            "group": "external",
            "position": "before"
          },
          {
            "pattern": "next",
            "group": "external",
            "position": "before"
          },
          {
            "pattern": "next/**",
            "group": "external",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/core/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/types/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/front-end/store",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/front-end/store/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/front-end/app/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/front-end/components/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/front-end/**/*.s?(a|c|s)ss",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/dashboard/store",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/dashboard/store/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/dashboard/app/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/dashboard/components/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/dashboard/**/*.s?(a|c|s)ss",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/back-end/config",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/back-end/config/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/back-end/db/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/back-end/modules/**/commands/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/back-end/modules/**/guards/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/back-end/modules/**/strategies/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/back-end/modules/**/*.module",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/back-end/modules/**/assets/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/back-end/modules/**/interfaces/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/back-end/modules/**/dto/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/back-end/modules/**/entities/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/back-end/modules/**/repositories/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/back-end/modules/**/controllers/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/back-end/modules/**/services/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/back-end/modules/**/providers/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/back-end/modules/**/data-mappers/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/back-end/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@boilerplate/back-end/*.*",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "**/*.scss",
            "group": "unknown",
            "position": "before"
          },
          {
            "pattern": "**/*.sass",
            "group": "unknown",
            "position": "before"
          },
          {
            "pattern": "**/*.css",
            "group": "unknown",
            "position": "before"
          },
        ],
        "pathGroupsExcludedImportTypes": [],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ],
    "import/newline-after-import": ["error"],
    "import/no-default-export": "error",
    "newline-before-return": ["error"],
    "no-cond-assign": ["error", "always"],
    "no-console": "error",
    "lines-between-class-members": "off",
    "consistent-return": ["off"],
    "padding-line-between-statements": [
      "error",
      {
        "blankLine": "always",
        "prev": "*",
        "next": "return"
      },
      {
        "blankLine": "always",
        "prev": ["const", "let"],
        "next": "*"
      },
      {
        "blankLine": "any",
        "prev": ["const", "let"],
        "next": "block-like"
      },
      {
        "blankLine": "any",
        "prev": ["const", "let"],
        "next": ["const", "let"]
      },
      {
        "blankLine": "always",
        "prev": "block-like",
        "next": "*"
      },
      {
        "blankLine": "never",
        "prev": "case",
        "next": "*"
      },
      {
        "blankLine": "always",
        "prev": "*",
        "next": "export"
      }
    ],
    "object-curly-newline": ["off"],
    "no-underscore-dangle": [
      "error",
      {
        "allow": ["_id"]
      }
    ],
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        "assertionStyle": "as"
      }
    ],
    "@typescript-eslint/typedef": "off",
    "@typescript-eslint/explicit-function-return-type": ["error"],
    "no-return-await": "off",
    "@typescript-eslint/return-await": ["error", "always"],
    "curly": ["error", "all"],
    "@typescript-eslint/array-type": ["error"],

    "jest/expect-expect": "off",
    // "jest/no-conditional-in-test": "error",
    "jest/no-duplicate-hooks": "error",
    // "jest/prefer-hooks-in-order": "error",
    "jest/prefer-hooks-on-top": "error",
    "jest/prefer-lowercase-title": ["error", { "ignoreTopLevelDescribe": true }],
    "jest/require-to-throw-message": "error",
    "jest/require-top-level-describe": "error",

    "eqeqeq": ["error", "always"],
    "spaced-comment": ["error", "always"],
    "@typescript-eslint/explicit-member-accessibility": ["error", { "accessibility": "no-public" }],
    "@typescript-eslint/no-inferrable-types": "error",
    "sort-imports": [
      "error",
      {
        "allowSeparatedGroups": true,
        "ignoreDeclarationSort": true
      }
    ],
    "@typescript-eslint/consistent-type-imports": ["error", {
      fixStyle: 'inline-type-imports',
      prefer: 'type-imports',
    }],
    "import/consistent-type-specifier-style": ["error", "prefer-inline"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "no-restricted-imports": [
      "error",
      {
        "paths": [
          {
            "name": "react",
            "importNames": ["default"],
          },
          {
            "name": "react-redux",
            "importNames": ['useDispatch', 'useSelector'],
            "message": "Use import { useAppDispatch, useAppSelector } from '@boilerplate/*/redux'"
          },
        ],
        "patterns": [
          {
            "group": ["./*", "../*"],
            "message": "Relative imports are not allowed."
          }
        ],
      }
    ],
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": ["error", { "allow": ["private-constructors"] }],
    "arrow-body-style": ["error", "as-needed"],
  }
})
