const path = require("path");
const webpack = require('webpack');
const dotenv = require('dotenv').config( {
  path: path.join(__dirname, './src/.env')
} );

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "app.js",
  },
  target: 'node',
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin( {
      "process.env": dotenv.parsed
    } ),
  ],
};

