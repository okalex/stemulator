const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [
  {
    mode: 'development',
    target: 'electron-preload',
    entry: './app/preload.ts',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'preload.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },

        {
          test: /\.(ts|tsx)?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
      ]
    },
    node: {
      __dirname: false,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  },

  {
    mode: 'development',
    target: 'electron-main',
    entry: './app/main.ts',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'main.js'
    },
    externals: {
      fsevents: "require('fsevents')",
      '@ffmpeg-installer/ffmpeg': 'commonjs @ffmpeg-installer/ffmpeg'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          },
        },

        {
          test: /\.(ts|tsx)?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ]
    },
    node: {
      __dirname: false,
      __filename: false
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  },

  {
    mode: 'development',
    target: 'web',
    entry: [
      './public/src/js/index.js',
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: './',
    },
    externals: {
      fsevents: "require('fsevents')"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          },
          include: path.resolve(__dirname, 'public/src/js')
        },

        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },

        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },

        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf)$/,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]'
          },
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/src/html/index.html'),
        filename: 'index.html'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devtool: 'eval-source-map',
  }
];
