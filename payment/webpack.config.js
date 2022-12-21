// This is the payment micro-frontend webpack configuration file
// Here is declared both the webpack configuration for the project
// and the configuration for the module federation plugin
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
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
    // Here is the configuration for the module federation plugin.
    // All the exposed components of the payment micro-frontend are listed in the exposed nested object
    new ModuleFederationPlugin({
      name: "payment",
      filename: "remoteEntry.js",
      exposes: {
        "./ReservationButton": "./src/components/ReservationButton",
        "./ShoppingCart": "./src/components/ShoppingCart",
      },
      shared: {
        react: {
          // Notice shared are NOT eager here.
          eager: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
