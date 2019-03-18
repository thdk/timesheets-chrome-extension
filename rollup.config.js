import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';

import typescript from 'rollup-plugin-typescript2';
import replace from 'rollup-plugin-replace';

const external = [
  "firebase/app",
  "@firebase/firestore",
  "mobx",
  "firebaseui",
];

export default {
  // modules listed as external will no be included in app bundle
  // they must either be included as script in html
  // or copied into dist/lib in gulp task copy:libs
  external,
  input: 'src/index.ts', // can be a typescript file if we have a rollup typescript plugin
  format: 'iife',
  globals: {
    'firebase/app': 'firebase',
    'mobx': 'mobx',
    'firebaseui': 'firebaseui'
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': `'${process.env.NODE_ENV || "development"}'`
    }),
    resolve(),
    commonJS({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react/index.js': ['createRef', 'Component', 'PureComponent', 'Fragment', 'Children', 'createElement', 'forwardRef'],
        'node_modules/react-dom/index.js': ['findDOMNode', 'unstable_batchedUpdates', 'render'],
        'firestorable': ['Collection', 'Document']
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