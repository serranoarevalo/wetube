const path = require("path");
const ExtractCSS = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

const ENTRY = path.resolve(__dirname, "assets", "js", "index.js");
const WEBPACK_ENV = process.env.WEBPACK_ENV;

const config = {
  entry: ["babel-polyfill", ENTRY],
  mode: WEBPACK_ENV,
  output: {
    path: path.resolve(__dirname, "static"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.(scss)$/,
        use: ExtractCSS.extract([
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              data: `@import 'assets/css/config/_variables.scss';`
            }
          }
        ])
      }
    ]
  },
  plugins: [new ExtractCSS("styles.css")]
};

module.exports = config;
