// This is the tree micro-frontend webpack configuration file
// Here is declared both the webpack configuration for the project
// and the configuration for the module federation plugin
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
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
    extensions: [".jsx", ".js", ".json", ".mjs", ".css"],
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
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
        type: "javascript/auto",
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {},
      },
    }),
    // Here is the configuration for the module federation plugin.
    // All the exposed components of the tree micro-frontend are listed in the exposed nested object
    new ModuleFederationPlugin({
      name: "tree",
      filename: "remoteEntry.js",
      exposes: {
        "./CatalogList": "./src/components/CatalogList",
        "./CatalogItem": "./src/components/CatalogItem",
        "./contexts/selectedTreeContext": "./src/contexts/selectedTreeContext",
      },
      shared: {
        react: {
          eager: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
