const webpack = require('webpack');

module.exports = function override(config) {
  // Add fallbacks for node modules
  config.resolve.fallback = {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    vm: require.resolve('vm-browserify'),
  };

  // Exclude specific modules from source-map-loader
  config.module.rules.forEach(rule => {
    if (rule.oneOf) {
      rule.oneOf.forEach(oneOf => {
        if (oneOf.use) {
          oneOf.use.forEach(use => {
            if (use.loader && use.loader.includes('source-map-loader')) {
              use.exclude = /node_modules\/react-bootstrap-sweetalert/;
            }
          });
        }
      });
    }
  });

  return config;
};
