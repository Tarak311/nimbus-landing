const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var webpack = require('webpack');
const WebpackSHAHash = require('webpack-sha-hash');
module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path:path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            minified : true, 
            compact : true,
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
         "css-loader"],
      },
      {
        test: /\.(png|ico|jp(e*)g|svg|gif)$/,
        use: [
          'file-loader?name=/img/[hash].[ext]' ,
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 25,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.5, 0.70],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 65
              }
            }
          },
        ],
      },
    ]
  },
  plugins: [

    
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new CspHtmlWebpackPlugin({
      'script-src': '',
      'style-src': ['\'unsafe-hashes\'','https://nimbus.north.tarakpatel.ca']
      }),
    new webpack.ProvidePlugin({
      "React": "react",
   }),
     new MiniCssExtractPlugin({
    filename: "./css/[name].[chunkhash].css",
  }),
  
  ],
  
}