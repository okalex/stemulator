const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');

// Only require the renderer config
const rendererConfig = require('./webpack.config.js')[2];

// Add HMR entry points
rendererConfig.entry = [
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server',
  'react-hot-loader/patch',
  rendererConfig.entry
].flat();

// Ensure the public path is set correctly
rendererConfig.output.publicPath = 'http://localhost:8080/';

// Configure webpack dev server
const compiler = webpack(rendererConfig);
const server = new WebpackDevServer({
  static: {
    directory: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  hot: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  port: 8080
}, compiler);

server.start().then(() => {
  console.log('Webpack dev server running at http://localhost:8080');
});
