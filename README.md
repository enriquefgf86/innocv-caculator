# innocv-calculator

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Headed Component Tests with [Cypress Component Testing](https://on.cypress.io/component)

```sh
npm run test:unit:dev # or `npm run test:unit` for headless testing
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### This project is based on Vue, using TypeScript as a type safety extension to help with JavaScript. Some e2e tests were implemented as a sample, as well as some functionalities of a conventional calculator (due to lack of time, features such as negative numbers to include in operations are not available). The project consists of a modular structure, divided into components, view, and rendering of the view in the core App, as well as using SCSS in a centralized file to which all components refer. On the other hand, for communication between the different components and main views, a multi-store upgrade of this new version of Vue 3: Pinia, was used instead of the conventional Vuex. The main difference is that with Pinia, we simply create an asynchronous function where we will change the states in the function itself. In contrast, Vuex will require the use of mutations to alter the state.

### Este proyecto está basado en Vue, utilizando TypeScript como extensión de seguridad de tipos para ayudar con JavaScript. Se implementaron algunas pruebas e2e como muestra, así como algunas funcionalidades de una calculadora convencional (debido a la falta de tiempo, características como números negativos para incluir en operaciones no están disponibles). El proyecto consta de una estructura modular, dividida en componentes, vista y renderizado de la vista en la aplicación principal, además de usar SCSS en un archivo centralizado al que todos los componentes se refieren. Por otro lado, para la comunicación entre los diferentes componentes y vistas principales, se utilizó una actualización de multi-store de esta nueva versión de Vue 3: Pinia, en lugar de Vuex convencional. La principal diferencia es que con Pinia, simplemente creamos una función asíncrona donde cambiaremos los estados en la propia función. En cambio, Vuex requerirá el uso de mutaciones para alterar el estado.
