// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

"use strict";

// @ts-nocheck
/* eslint-disable */
let System, __instantiate;
(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };
  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      const e = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(e)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
      return v;
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }
  __instantiate = (m, a) => {
    System = __instantiate = undefined;
    rF(m);
    return a ? gExpA(m) : gExp(m);
  };
})();

"use strict";
System.register("file:///C:/Users/Manu/Documents/Learning/Deno/deno-1.3.3/03-deno-modules/example-export", [], function (exports_1, context_1) {
    "use strict";
    var convert;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("convert", convert = (input) => input.toLowerCase() === 'node' ? input.split('').sort().join('') : input);
        }
    };
});
console.log("Welcome to Deno 🦕");
System.register("file:///C:/Users/Manu/Documents/Learning/Deno/deno-1.3.3/03-deno-modules/example-import", ["file:///C:/Users/Manu/Documents/Learning/Deno/deno-1.3.3/03-deno-modules/example-export", "https://deno.land/std@0.71.0/examples/welcome.ts"], function (exports_2, context_2) {
    "use strict";
    var example_export_ts_1;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (example_export_ts_1_1) {
                example_export_ts_1 = example_export_ts_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            console.log(example_export_ts_1.convert('node'));
        }
    };
});

__instantiate("file:///C:/Users/Manu/Documents/Learning/Deno/deno-1.3.3/03-deno-modules/example-import", false);
