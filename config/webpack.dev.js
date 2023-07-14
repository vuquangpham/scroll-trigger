// node packages
const path = require("path");

// webpack
const common = require("./webpack.common");
const {merge} = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// config
const config = require('./config');

// export
module.exports = merge(common, {
    mode: "development",
    entry: config.paths.devDirectoryScript,
    output: {
        path: config.paths.distDirectory,
    },
    devtool: "inline-source-map",
    devServer: {
        static: {
            directory: config.paths.distDirectory,
            watch: true,
        },
        port: 3000,
        open: true,
        watchFiles: ["./*", path.resolve(__dirname, '../', 'dev', '*')],
        hot: true,
    },
    module: {
        rules: [
            {test: /\.css$/i, use: ['style-loader', 'css-loader'],},
            {test: /\.s[ac]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader'],},
            {test: /\.html$/, use: [{loader: "html-loader",},],},
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(config.paths.devDirectory, 'index.html'),
            filename: 'index.html',
            inject: true,
        }),
    ]
});