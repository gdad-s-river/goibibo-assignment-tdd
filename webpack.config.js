const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');

const modeConfig = env => require(`./build-utils/webpack.${env}`);
const presetConfig = require(`./build-utils/loadPresets`);

// mode, presets passed through webpack-cli parameters
module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
  return webpackMerge(
    {
      mode,
      entry: './src/index.js',
      output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js',
      },
      plugins: [
        new HtmlWebpackPlugin({
          title: 'Goibibo Interview Assignment',
          template: path.join(__dirname, 'src/index.html'),
          filename: 'index.html',
        }),
        new webpack.ProgressPlugin(),
      ],
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
    },
    modeConfig(mode),
    presetConfig({ mode, presets }),
  );
};
