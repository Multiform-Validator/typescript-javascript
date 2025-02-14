const path = require("path");

/** @type {import("webpack").Configuration} */
const commonjsWebpackConfig = {
  mode: "production", // production mode
  entry: "./index.ts", // entry point of your application
  output: {
    filename: "index.js", // output file name
    path: path.resolve(__dirname, "dist"), // output folder
    libraryTarget: "umd", // this allows your module to be used via require() and as a global
    globalObject: "this", // this ensures that 'this' is 'window' in a browser environment
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
};

/** @type {import("webpack").Configuration} */
const moduleWebpackConfig = {
  mode: "production", // production mode
  entry: "./index.ts", // entry point of your application
  output: {
    filename: "index.mjs", // output file name
    path: path.resolve(__dirname, "dist"), // output folder
    libraryTarget: "module", // this allows your module to be used via import
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
};

module.exports = [commonjsWebpackConfig, moduleWebpackConfig]; // export the webpack config
