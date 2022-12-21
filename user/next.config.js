// The user micro-frontend is a next application which shows
// you can combine different framework in a micro-frontend architecture.
// This is also why the webpack configuration is in the next.config.js file and not
// in a webpack.config.js

const NextFederationPlugin = require("@module-federation/nextjs-mf/lib/NextFederationPlugin");

module.exports = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        // Here is the configuration for the module federation plugin.
        // All the exposed components of the payment micro-frontend are listed in the exposed nested object
        new NextFederationPlugin({
          name: "user",
          remotes: {},
          filename: "static/chunks/remoteEntry.js",
          exposes: {
            "./loginPage": "./components/LoginPage.js",
            "./userMenu": "./components/UserMenu.js",
          },
          shared: {
            react: {
              requiredVersion: false,
              singleton: true,
            },
          },
          extraOptions: {
            skipSharingNextInternals: true,
          },
        })
      );
    }
    return config;
  },
  // your original next.config.js export
  reactStrictMode: true,
};
