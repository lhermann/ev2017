var webpack = require("webpack");
var path = require("path");
var PROD = process.env.NODE_ENV === "production";

module.exports = {
    entry: "./src/_webpack/main.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "src/assets/js/")
    },
    devtool: "source-map",
    target: "node",
    plugins: PROD
        ? [
              new webpack.optimize.UglifyJsPlugin({
                  compress: { warnings: false }
              })
          ]
        : []
};
