/*
 *
 * Copyright 2018 Odysseus Data Services, inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Company: Odysseus Data Services, Inc.
 * Product Owner/Architecture: Gregory Klebanov
 * Authors: Pavel Grafkin, Alexander Saltykov
 * Created: July 29, 2026
 *
 */

/*
 * Replaces the previous .eslintrc (eslint 3 + eslint-config-airbnb 12).
 *
 * eslint-config-airbnb is eslintrc-only and unmaintained for flat config, and
 * eslint-plugin-react / -import / -jsx-a11y each still vendor a vulnerable
 * minimatch. They are therefore not wired up here. To add React linting back
 * once those plugins ship a fix, install eslint-plugin-react and append
 * `react.configs.flat.recommended` to the array below.
 */

const js = require('@eslint/js');

module.exports = [
  js.configs.recommended,
  {
    files: ['src/**/*.js', 'src/**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Browser surface the components rely on.
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        requestAnimationFrame: 'readonly',
        FileReader: 'readonly',
        Image: 'readonly',
        // Components pull their stylesheets in with webpack's require() from
        // inside ES modules, so it is a global here rather than CommonJS.
        require: 'readonly',
        module: 'readonly',
        // Build-time flags injected by the consuming application.
        __APP_TYPE_CENTRAL__: 'readonly',
        __APP_TYPE_NODE__: 'readonly',
      },
    },
    rules: {
      // JSX makes React/component identifiers look unused to the base rule.
      'no-unused-vars': ['error', { varsIgnorePattern: '^React$' }],
    },
  },
];
