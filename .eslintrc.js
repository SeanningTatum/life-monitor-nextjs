module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "next/core-web-vitals",
    "plugin:react/recommended",
    "@kensho-technologies/eslint-config",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/space-before-function-paren": "off",
    "@typescript-eslint/indent": "off",
    // 'react/prop-types': [true, { ignore: 'className' }],
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "react/destructuring-assignment": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "react/jsx-no-constructed-context-values": "warn",
    "@typescript-eslint/promise-function-async": "off"
  },
};
