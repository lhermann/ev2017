const path = require('path');

module.exports = {
    entry: './src/_webpack/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'src/assets/js/')
    },
    devtool: 'source-map',
    target: 'node',
};
