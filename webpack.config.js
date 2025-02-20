const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const defaultInclude = path.resolve(__dirname, 'public/src/js')

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
          },
          include: defaultInclude
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
          include: defaultInclude
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
    },

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  },

  {
    mode: 'development',
    target: 'electron-renderer',
    entry: './public/src/js/index.js',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/',
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
          include: defaultInclude
        },

        {
          test: /\.(ts|tsx)?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },

        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          include: defaultInclude
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
          include: defaultInclude
        },
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        filename: 'index.html'
      }),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ],

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },

    devServer: {
      hot: true,
      historyApiFallback: true,
    }
  }
];
