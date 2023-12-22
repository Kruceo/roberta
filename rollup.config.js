// rollup.config.js

module.exports =  {
  input: 'src/index.mjs',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.mjs',
      format: 'esm',
    }
  ],
};