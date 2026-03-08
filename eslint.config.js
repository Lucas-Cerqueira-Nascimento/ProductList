import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import cypress from "eslint-plugin-cypress/flat"; // Import correto

export default [
  // 1. Ignorar pastas de build
  { ignores: ["dist"] },

  // 2. Configurações recomendadas (JS e Cypress)
  js.configs.recommended,
  cypress.configs.recommended,

  // 3. Sua configuração customizada
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node, // Útil para configs
        ...cypress.environments.globals, // Aqui a mágica acontece para o Cypress
      },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "cypress/no-unnecessary-waiting": "warn",
    },
  },
];
