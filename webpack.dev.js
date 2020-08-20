const compression = require('compression');
const express = require('express');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

// local imports
const common = require('./webpack.common.js');

const port = process.env.PORT || 8080;

module.exports = webpackMerge(common, {
  devtool: 'cheap-eval-source-map',
  mode: 'development',
  entry: {
    app: [
      'react-hot-loader/patch',
      './app/index',
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        WWW_KEYCLOAK_CLIENT_ID: JSON.stringify(process.env.WWW_KEYCLOAK_CLIENT_ID),
        KEYCLOAK_REALM: JSON.stringify(process.env.KEYCLOAK_REALM),
        KEYCLOAK_URI: JSON.stringify(process.env.KEYCLOAK_URI),
        WWW_KEYCLOAK_ACCESS_ROLE: JSON.stringify(process.env.WWW_KEYCLOAK_ACCESS_ROLE),
        WWW_UI_ENVIRONMENT: JSON.stringify(process.env.WWW_UI_ENVIRONMENT),
        WWW_STORAGE_KEY: JSON.stringify(process.env.WWW_STORAGE_KEY),
        WWW_UI_VERSION: JSON.stringify(process.env.WWW_UI_VERSION),
        API_COP_URI: JSON.stringify(process.env.API_COP_URI),
        API_REF_URI: JSON.stringify(process.env.API_REF_URI),
        ENGINE_URI: JSON.stringify(process.env.ENGINE_URI),
        TRANSLATION_URI: JSON.stringify(process.env.TRANSLATION_URI),
        REPORT_URI: JSON.stringify(process.env.REPORT_URI),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    compress: true,
    contentBase: 'public/',
    historyApiFallback: true,
    hot: true,
    open: true,
    port: `${port}`,
    publicPath: common.output.publicPath,
    stats: { colors: true },
    before(app) {
      app.use(compression({}));
      app.post('/log', (req, res, next) => {
        const body = [];
        req.on('data', (chunk) => {
          console.log(chunk);
          body.push(chunk);
        });
        req.on('end', () => {
          const parsedBody = Buffer.concat(body).toString();
          const message = parsedBody.split('=')[1];
          console.log(parsedBody);
          console.log(message);
        });
        console.log(body);
        res.sendStatus(200);
      });
    },
  },
});
