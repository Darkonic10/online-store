const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production';


const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const pages = ['index'];

const htmlPlugins = pages.map(
  (page) =>
    new HtmlWebpackPlugin({
      inject: true,
      template: `./${page}.html`,
      filename: `${page}.html`,
      chunks: [page],
      //favicon: `${path.resolve(__dirname, './src/assets/favicon/favicon.ico')}`,
    })
)

const tsLoaders = () => {
  const loaders = ['ts-loader']
  if (!isProduction) {
    loaders.push('eslint-loader')
  }
  return loaders
}

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: pages.reduce((config, page) => {
    config[page] = path.resolve(__dirname, './src/', `./${page}.ts`);
    return config;
  }, {}),
  devtool: 'source-map',
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  devServer: {
    open: {
      app: {
        name: 'chrome',
      }
    },
    host: 'localhost',
  },
  plugins: [].concat(
    htmlPlugins,
    new CleanWebpackPlugin(),
    // <- here goes array(s) of other plugins
  ),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/

  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: tsLoaders(),
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.css$/i,
        use: [stylesHandler,'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|mp3|wav)$/i,
        type: 'asset',
      },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';

    config.plugins.push(new MiniCssExtractPlugin());


  } else {
    config.mode = 'development';
  }
  return config;
};
