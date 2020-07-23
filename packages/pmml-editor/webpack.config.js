/*
 * Copyright 2020 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const pfWebpackUtils = require("@kogito-tooling/patternfly-base/webpackUtils");
const { merge } = require("webpack-merge");
const common = require("../../webpack.common.config");

module.exports = merge(common, {
  entry: {
    index: "./src/index.tsx"
  },
  externals: [nodeExternals({ modulesDir: "../../node_modules" })],
  plugins: [
    new CopyPlugin([
      { from: "./static/resources", to: "./resources" },
      { from: "./static/images", to: "./images" },
      { from: "./static/index.html", to: "./index.html" },
      { from: "./static/favicon.ico", to: "./favicon.ico" }
    ])
  ],
  module: {
    rules: [...pfWebpackUtils.patternflyLoaders]
  },
  devServer: {
    historyApiFallback: {
      disableDotRule: true
    },
    disableHostCheck: true,
    watchContentBase: true,
    contentBase: [path.join(__dirname, "./dist"), path.join(__dirname, "./static")],
    port: 9001
  }
});