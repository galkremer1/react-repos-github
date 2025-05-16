const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const postcss = require("rollup-plugin-postcss");
const json = require("@rollup/plugin-json");
const fs = require('fs');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

module.exports = [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      json(),
      typescript({
        tsconfig: "./tsconfig.json",
        outDir: ".",
        declaration: true,
        declarationDir: ".",
      }),
      postcss({
        extensions: [".css"],
        minimize: true,
        inject: {
          insertAt: "top",
        },
      }),
    ],
    external: ["react", "react-dom"],
  }
]; 