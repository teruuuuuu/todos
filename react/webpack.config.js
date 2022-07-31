const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        hot: true,
        compress: true,
        port: 9000,
        open: true,
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
              },
        ]
    },
    entry: {
        index: './src/index.jsx',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: '[name].html'
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
};