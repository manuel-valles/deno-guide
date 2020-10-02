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
   - Version: `$ deno -V`
   - (Admin) Upgrade to latest version: `$ deno upgrade`
   - Commands: `$ deno --help`
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

     - NodeJS Bindings ~ Rust
     - Libuv ~ Tokio

     ![NodeSystem](/images/NodeArchitecture.jpg)

   - **NOTE**: Rust is called every time you use the Runtime API (https://doc.deno.land/builtin/stable): _Deno._ & _window._
     As difference with NodeJS, Deno has browser compatibility, so you don't need libraries like _node-fetch_ because it's not included in **global** for NodeJS.

4. Deno Metrics
   - Receive metrics from the privileged side of Deno. This is primarily used in the development of Deno. 'Ops', also called 'bindings', are the go-between between Deno JavaScript and Deno Rust.
     ```typescript
     console.table(Deno.metrics());
     ```

## 2. Deno Vs Node

- Main game changers:

  - First class TypeScript
  - ES Modules
    - `import "https://deno.land/std@0.71.0/examples/chat/server.ts"`
  - Security First
    - `$ deno run --allow-net ./deno/welcome-example.ts`
  - Decentralized modules
    - We don't have to use **npm** (Microsoft)
    - We can use many places to collect the packages by just a URL with the script. e.g.: https://deno.land/x
  - Standard Library -> https://deno.land/std@0.71.0
  - Built In Tooling (testing, formatting, file watchers,...)
  - Browser Compatible API (window, fetch,...)
  - Single Executable (deno.exe)
  - Async returns Promises (Promises in Deno translated to Futures in Rusty and vice versa)
  - Opinionated Modules (https://deno.land/manual/contributing/style_guide)

- Permissions:

  - You need to allow some permissions depending on the access level. For example:
    ```typescript
    console.log(`Hello ${Deno.env.get('USERNAME')}`);
    ```
    - `$ deno run --allow-env ./deno/permissions.ts`
    - `$ deno run --allow-all ./deno/permissions.ts`
    - `$ deno run -A ./deno/permissions.ts`
  - You can also create a script and install it globally (it takes the name of the parent path):

    - `$ deno install --allow-env main.ts`

  - **Drake** is a Make-like task runner (build automation tool that automatically builds executable programs and libraries from source code by reading files called _Makefiles_ which specify how to derive the target program) for Deno inspired by Make, Rake and Jake. https://deno.land/x/drake@v1.4.2

    ```typescript
    import {
      desc,
      run,
      task,
      sh,
    } from 'https://deno.land/x/drake@v1.4.2/mod.ts';

    desc('Minimal Drake task');
    task('hello', [], async function () {
      console.log('Hello from Drake!');
      await sh('deno run --allow-env main.ts');
    });

    run();
    ```

    `$ deno run -A Drakefile.ts hello`

## 3. Deno Modules

- **ES Modules**: Any JavaScript or TypeScript file. In Deno, the file extension must be provided for imports (**.js, .ts**). `import {example} from "./intro.js"`
- To get the info of a Module:

  - `$ deno info ./03-deno-modules/example-import.ts`

  ```
    local: C:\Users\Manu\Documents\Learning\Deno\deno-1.3.3\03-deno-modules\example-import.ts
    type: TypeScript
    compiled: C:\Users\Manu\AppData\Local\deno\gen\file\C\Users\Manu\Documents\Learning\Deno\deno-1.3.3\03-deno-modules\example-import.ts.js
    deps: 2 unique (total 371B)
    file:///C:/Users/Manu/Documents/Learning/Deno/deno-1.3.3/03-deno-modules/example-import.ts (137B)
    ├── file:///C:/Users/Manu/Documents/Learning/Deno/deno-1.3.3/03-deno-modules/example-export.ts (122B)
    └── https://deno.land/std@0.71.0/examples/welcome.ts (112B)
  ```

- **Standard Library** contains all the modules (without external dependencies) maintained by the Deno team. For example, `$ deno info https://deno.land/std@0.71.0/examples/welcome.ts`

  ```
    local: C:\Users\Manu\AppData\Local\deno\deps\https\deno.land\18b31e735f535d082cbca4e4425bd22c7ebdbaf8899707498079a6a624527e3e
    type: TypeScript
    compiled: C:\Users\Manu\AppData\Local\deno\gen\https\deno.land\18b31e735f535d082cbca4e4425bd22c7ebdbaf8899707498079a6a624527e3e.js
    deps: 0 unique (total 112B)
    https://deno.land/std@0.71.0/examples/welcome.ts (112B)
  ```

- **Third Party Modules** contains all the modules created by the Deno Community.

- **Caching** is used to storage data what speeds up the processes. Deno caches remote imports in a special directory specified by the _DENO_DIR_ environment variable (e.g. Windows: _C:\Users\Manu\AppData\Local\deno_). The next time you run the program, no downloads will be made. If the program hasn't changed, it won't be recompiled either.

  - To force/reload the module (downloads & recompilation): `$ deno run --reload ./03-deno-modules/example-import.ts`
  - To change the DENO_DIR path (Windowds): `$ export DENO_DIR=./deno_dir`
  - More info: https://deno.land/manual/linking_to_external_code

- _Pika_ or _Skypack_ is a CDN that allow you to use any npm package anywhere (**NPM for Deno**): https://www.skypack.dev/

- A best practice for the dependencies is to allocate all of them in a file **deps.ts** (similar what _package.json_ does in NodeJS). This way, we can also manage the versioning.

- By using a lock file (with the **--lock** command line flag), you can ensure that the code pulled from a URL is the same as it was during initial development.

  - `$ deno cache --lock=./03-deno-modules/src/lock.json --lock-write ./03-deno-modules/src/deps.ts`
  - More info: https://deno.land/manual/linking_to_external_code/integrity_checking

- Deno provides some **built in tooling** that is useful when working with JavaScript and TypeScript: https://deno.land/manual/tools
  - Example **Bundle**: deno bundle ./03-deno-modules/example-import.ts ./03-deno-modules/example.bundle.ts
    - This will output a single JavaScript file, which includes all dependencies of the specified input (~ Webpack).
