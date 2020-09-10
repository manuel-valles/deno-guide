# deno-1.3.3
A project to get the Deno's Wisdom | 2020 &amp; Up

0. Intro to TS
    1. Install TypeScript Compiler globally with npm: 
        ``` 
        $ npm i -g typescript 
        ```
        For Windows, add the path to the environment variables: ```C:\Users\{user}\AppData\Roaming\npm```
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
