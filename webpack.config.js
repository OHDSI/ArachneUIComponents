/*
 *
 * Copyright 2018 Odysseus Data Services, inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Company: Odysseus Data Services, Inc.
 * Product Owner/Architecture: Gregory Klebanov
 * Authors: Pavel Grafkin, Alexander Saltykov
 * Created: March 01, 2017
 *
 */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const rootPath = path.resolve(__dirname, 'src');
const stylesFolder = path.resolve(rootPath, 'styles');

const outputPath = path.join(__dirname, 'lib');
const stylesOutputPath = path.resolve(outputPath, 'styles');

// Also used as sass includePaths so bare @imports such as
// 'react-select/dist/react-select' and 'styles/vars-and-mixins' keep resolving.
const modulePaths = [
  rootPath,
  path.resolve(__dirname, 'node_modules'),
  path.resolve(__dirname, '..'),
];

const config = {
  // webpack 1 had no notion of modes and emitted an unoptimised bundle. Keeping
  // 'none' preserves that: the published artifact stays unminified with no
  // NODE_ENV baked in, leaving both choices to the consuming application.
  mode: 'none',
  devtool: 'source-map',
  entry: path.join(rootPath, 'index.js'),
  resolve: {
    modules: modulePaths,
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [rootPath],
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // Font and icon url()s are root-relative paths that the consuming
              // application serves at runtime (it copies lib/resources into its
              // own dist), so they must reach the CSS untouched.
              url: {
                filter: url => !url.startsWith('/'),
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: modulePaths,
                // Silence deprecations raised inside node_modules only - the
                // tootik package still uses @import internally. Deprecations in
                // this package's own stylesheets are still reported.
                quietDeps: true,
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    path: outputPath,
    filename: 'index.js',
    libraryTarget: 'umd',
    // webpack 5 defaults the UMD global to `self`, which is undefined outside a
    // browser and makes the bundle throw on require() in Node/SSR. webpack 1
    // used `root`; `this` restores equivalent behaviour.
    globalObject: 'this',
    clean: true,
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'react-router': 'react-router',
    redux: 'Redux',
    'react-redux': 'react-redux',
    'redux-form': 'redux-form',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/components.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: stylesFolder,
          to: stylesOutputPath,
        },
        {
          from: path.join(rootPath, 'resources/fonts'),
          to: path.join(outputPath, 'resources/fonts'),
        },
        {
          from: path.join(rootPath, 'resources/material-design-icons'),
          to: path.join(outputPath, 'resources/material-design-icons'),
        },
      ],
    }),
  ],
};

module.exports = config;
