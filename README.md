# Deno v1.3.3

A project to get the Deno's Wisdom | 2020 &amp; Up

## 0. Intro to TS

1. Install TypeScript Compiler globally with npm:
   ```
   $ npm i -g typescript
   ```
   For Windows, add the path to the environment variables: `C:\Users\{user}\AppData\Roaming\npm`
2. Version, compilation and run:
   ```typescript
   // Check version and options
   $ tsc
   // Compile a JS file
   $ tsc intro.ts
   // Run the compiled file
   $ node intro.js
   ```
3. Initialize the project as TS project:
   ```typescript
   // create tsconfig file
   $ tsc --init
   // keep it running
   $ tsc intro.ts --watch
   // new tab to keep node also running
   $ nodemon intro.js
   ```
4. Documentation: https://www.typescriptlang.org/docs

## 1. Deno Foundations

1. Installation

   - https://deno.land/
   - (Admin) `$ choco install deno`
   - **NOTE:** Deno has a built-in TypeScript compiler: `$ deno run intro.ts`

2. VSCode Extension:

   - https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno
   - Create a file _.vscode/settings.json_ in your project folder:

   ```json
   {
     "deno.enable": true
   }
   ```

3. Deno Process

   - It acts like a sandbox with some memory where you can run a program. This program is **Rusty_v8** in Deno. It allows Deno to communicate with the **Rust** code.
   - _Rust_ is a multi-paradigm programming language focused on performance and safety, especially safe concurrency. Rust is syntactically similar to C++, and provides memory safety without using garbage collection. https://github.com/denoland/deno/blob/master/core/core.js
   - _Rust_ uses the Tokio library for the _Thread Pool_. **Tokio** is a runtime for writing reliable, asynchronous, and slim applications with the Rust programming language.
   - Similarities with NodeJS System:

     - NodeJS Bidings ~ Rust
     - Libuv ~ Tokio

     ![NodeSystem](/images/NodeArchitecture.jpg)

   - **NOTE**: Rust is called every time you use the Runtime API (https://doc.deno.land/builtin/stable): _Deno._ & _window._
     As difference with NodeJS, Deno has browser compatibility, so you don't need libraries like _node-fetch_ because it's not included in **global** for NodeJS.

4. Deno Metrics
   - Receive metrics from the privileged side of Deno. This is primarily used in the development of Deno. 'Ops', also called 'bindings', are the go-between between Deno JavaScript and Deno Rust.
     ```typescript
     console.table(Deno.metrics());
     ```
