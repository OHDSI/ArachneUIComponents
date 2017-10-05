/*
 *
 * Copyright 2017 Observational Health Data Sciences and Informatics
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

const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const rootPath = path.resolve(__dirname, 'src');
const componentsFolder = path.resolve(rootPath, 'components');
const stylesFolder = path.resolve(rootPath, 'styles');

const outputPath = path.join(__dirname, 'lib');
const componentsOutputPath = path.resolve(outputPath, 'components');
const stylesOutputPath = path.resolve(outputPath, 'styles');

const config = {
  //entry: components,
  devtool: 'source-map',
  entry: path.join(__dirname, 'src', 'index.js'),
  resolve: {
    root: [
      rootPath,
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '..'),
    ],
    extensions: ['', '.js', '.jsx']
  },
  sassLoader: {
    includePaths: [
      rootPath,
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '..'),
    ],
    data: '$isAppCentral: true; $isAppNode: false;',
  },
  eslint: {
    configFile: path.join(__dirname, '.eslintrc'),
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        include: [rootPath],
        loader: 'eslint-loader',
      },
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        include: [rootPath],
        loader: 'babel'
      },
      {
        test: /\.json?$/,
        exclude: /node_modules/,
        loader: 'json'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass'),
        // loader: 'style!css!sass',
      }
    ]
  },
  output: {
    path: outputPath,
    filename: 'index.js',
    //filename: '[name]/index.js',
    libraryTarget: 'umd',
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
    'react-router': 'react-router',
    'redux': 'Redux',
    'react-redux': 'react-redux',
    'redux-form': 'redux-form',
  },
  plugins: [
    /*new CopyWebpackPlugin(
      [
        {
          from: componentsFolder,
          to: componentsOutputPath
        },
      ],
      {
        ignore: [
          '*.js',
          '*.jsx'
        ],
      }
    ),*/
    new ExtractTextPlugin('styles/components.css'),
    new CopyWebpackPlugin(
      [
        {
          from: stylesFolder,
          to: stylesOutputPath
        },
        {
          from: path.join(rootPath, 'resources/fonts'),
          to: path.join(outputPath, 'resources/fonts')
        },
      ]
    )
  ]
};

module.exports = config;