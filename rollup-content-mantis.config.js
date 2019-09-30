import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';

import typescript from 'rollup-plugin-typescript2';
import replace from 'rollup-plugin-replace';

export default {
  input: 'src/contentscript.ts', // can be a typescript file if we have a rollup typescript plugin
  format: 'iife',
  name: "backgroundscript",
  external: ["@types/chrome"],
  plugins: [
    replace({
      // Warning: process.env.NODE_ENV is never of type "undefined" it's always of type "string"
      // So process.env.NODE_ENV = undefined will result in a value "undefined"
      // https://github.com/nodejs/node-v0.x-archive/issues/25873
      'process.env.NODE_ENV': `'${(process.env.NODE_ENV && process.env.NODE_ENV !== "undefined" ? process.env.NODE_ENV : "development")}'`
    }),
    resolve(),
    commonJS({
      include: 'node_modules/**',
      namedExports: {'node_modules\\firebase\\app\\dist\\index.esm.js': ['initializeApp'],
      }
    }),
    typescript(),
    // sizes() // uncomment to analyse packages sizes included in the bundle
  ],
  onwarn: function (warning) {
    // Suppress this error message:
    // "The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten"
    if (warning.code === 'THIS_IS_UNDEFINED') return;

    console.error(warning.message);
  }
};