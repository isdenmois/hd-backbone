'use strict';

const helpers = require('./helpers');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/app.js'
  },

  output: {
    path: helpers.root('dist'),

    filename: 'bundle.js',
  },

  resolve: {
    // Absolute path that contains modules
    root: __dirname,
    alias: {
      underscore: 'lodash',
      handlebars: 'handlebars/dist/handlebars.min.js'
    }
  },


  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=image/svg+xml'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader"
      },
      {
        test: /\.jpg$/,
        loader: "file-loader"
      },
      {
        test: /\.png$/,
        loader: "file-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'es2016', 'stage-0']
        }
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader?variable=data'
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader?helperDirs[]=' + __dirname + '/../src/helpers'
      },
      {
        test: /bootstrap\/dist\/js\/umd\//,
        loader: 'imports?jQuery=jquery'
      }
    ]
  },

  plugins: [

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    }),

    new webpack.ProvidePlugin({
      _: 'lodash',
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })

  ]
};
