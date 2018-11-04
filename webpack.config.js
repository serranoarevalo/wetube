const path = require("path");

const config = {
  entry: "./static/index.js",
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
      }
    ]
  }
};

module.exports = config;
