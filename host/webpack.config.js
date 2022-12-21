// This is the host micro-frontend webpack configuration file
// Here is declared both the webpack configuration for the project
// and the configuration for the module federation plugin

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const webpack = require("webpack");
const deps = require("./package.json").dependencies;
module.exports = {
  entry: "./src/index",
  entry: {
    app: {
      import: "./src/index",
    },
  },
  cache: false,

  mode: "development",
  devtool: "source-map",

  optimization: {
    minimize: false,
  },

  output: {
    publicPath: "auto",
  },

  resolve: {
    extensions: [".jsx", ".js", ".json", ".mjs"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx?$/,
        loader: require.resolve("babel-loader"),
        exclude: /node_modules/,
        options: {
          presets: [require.resolve("@babel/preset-react")],
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      process: { env: {} },
    }),
    // Here is the host configuration for the module federation plugin
    // The main goals this configuration is to declare the remotes Micro-frontends
    // and give them a name. The name will be used as entry point for the import path
    // In host/App.jsx you cann see the following example of import => import LoginPage from "user/loginPage";
    new ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        user: "user@http://localhost:8081/_next/static/chunks/remoteEntry.js",
        payment: "payment@http://localhost:8082/remoteEntry.js",
        tree: "tree@http://localhost:8083/remoteEntry.js",
      },
      exposes: {},
      // In the module federation plugin, shared dependencies can also be declared to optimize bundle size.
      // Here react is shared between 3 of the 4 micro-frontends, so it's relevant to add it as a shared
      // dependency
      shared: {
        react: {
          // Notice shared are NOT eager here.
          requiredVersion: false,
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
