// ESLint flat config: recommended JavaScript rules, typescript-eslint's strictest
// type-aware presets, SonarJS, and size limits that keep code in small pieces.
// The limits are part of the harness. Change them only through an ADR and a
// template update, never in a single app to make a check pass.
import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import sonarjs from "eslint-plugin-sonarjs";
import globals from "globals";
import tseslint from "typescript-eslint";

const codeLinesOnly = { skipBlankLines: true, skipComments: true };

const sizeLimits = {
  complexity: ["error", 10],
  "max-depth": ["error", 4],
  "max-params": ["error", 5],
  "max-lines-per-function": ["error", { max: 50, ...codeLinesOnly }],
  "max-lines": ["error", { max: 300, ...codeLinesOnly }],
};

const presets = [
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  sonarjs.configs.recommended,
];

export default defineConfig(
  { ignores: [".venv/", "coverage/", "dist/"] },
  ...presets,
  {
    languageOptions: {
      globals: { ...globals.node },
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    linterOptions: { reportUnusedDisableDirectives: "error" },
    rules: sizeLimits,
  },
  // Plain JavaScript files, such as this one, have no type information.
  { files: ["**/*.js"], extends: [tseslint.configs.disableTypeChecked] },
  // Last, so formatting is left to Prettier.
  eslintConfigPrettier,
);
