
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

module.exports = webpackMerge(commonConfig, {
  debug: true,
  devtool: 'inline-source-map',

  devServer: {
    port: 3000,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    outputPath: 'dist',

    proxy: {
      '/rest*': {
        target: 'http://dev-helpdesk.it-oblako.ru/',
        secure: false,
        ignorePath: false,
        changeOrigin: true
      },
      '/devrest*': {
        target: 'http://dev-helpdesk.it-oblako.ru/',
        secure: false,
        ignorePath: false,
        changeOrigin: true
      }
    }
  }
});
