const path = require('path');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: './src/_webpack/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'src/assets/js/')
    },
    devtool: 'source-map',
    target: 'node',
    // node: {
    //     fs: "empty"
    // }
    // plugins: [
    //     new UglifyJSPlugin({
    //         sourceMap: true,
    //         include: '/src/assets/js'
    //     })
    // ]
};
