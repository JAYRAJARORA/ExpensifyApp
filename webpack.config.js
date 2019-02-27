// entry -> output point
const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        // it takes in absolute file path
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        // tell the dev server to always show index.html for 404 pages
        historyApiFallback: true 
    }
};
