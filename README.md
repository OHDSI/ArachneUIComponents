# ArachneUIComponents

`arachne-ui-components` — the shared React UI kit behind the OHDSI ARACHNE and
Athena applications. It provides ~47 presentational and form components (buttons,
tables, modals, tabs, a full `redux-form` widget set, layout chrome) together with
the stylesheets, fonts and icons they render with.

Published to npm as [`arachne-ui-components`](https://www.npmjs.com/package/arachne-ui-components).

## Installing

```bash
npm install arachne-ui-components
```

The React/Redux stack is expected to come from the consuming application rather
than from this package, so it is declared as peer dependencies: `react`,
`react-dom`, `react-router`, `redux`, `react-redux`, `redux-form` and
`react-datepicker`. Everything else the components need is bundled into the
published build.

> **Note:** the components target **React 15**.

## Using it

Components are named exports of the package root:

```jsx
import { Button, Form, FormInput, Modal, Table } from 'arachne-ui-components';
```

Styles ship separately and are imported by the application:

```scss
@use 'arachne-ui-components/lib/styles/app';         // resets, fonts, tooltips
@use 'arachne-ui-components/lib/styles/components';  // compiled component CSS
@use 'arachne-ui-components/lib/styles/vars-and-mixins' as *;  // variables + mixins
```

`vars-and-mixins` is the public style API — the variables, colours and mixins
applications are expected to build on. Class names are namespaced through a
`$namespace` variable (default `ac-`) that a consumer can rebind to its own
prefix when including the mixins.

Fonts and icons are emitted to `lib/resources/`; applications typically copy
them into their own build output.

## Developing

```bash
npm install
npm run build
npm run lint
```

The build produces a UMD bundle at `lib/index.js`, compiled CSS at
`lib/styles/components.css`, and copies the source stylesheets and assets
alongside them. Stylesheets use the Sass module system (`@use` / `@forward`).

## License

Apache 2.0 — see [LICENSE](LICENSE).
