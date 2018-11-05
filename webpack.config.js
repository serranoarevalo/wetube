const path = require("path");
const ExtractCSS = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

const ENTRY = path.resolve(__dirname, "static", "js", "index.js");

const config = {
  entry: ENTRY,
  mode: "production",
  output: {
    path: path.resolve(__dirname, "static", "dist"),
    filename: "[name].bundle.js"
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
              data: `@import 'static/css/config/_variables.scss';`
            }
          }
        ])
      }
    ]
  },
  plugins: [new ExtractCSS("styles.css")]
};

module.exports = config;
