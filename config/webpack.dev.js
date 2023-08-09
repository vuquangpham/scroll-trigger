// node packages
const path = require("path");

// webpack
const {merge} = require("webpack-merge");

// config
const config = require('./config');

// export
module.exports = merge(config.webpackCommonConfig, {
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
        // HTML output
        config.webpackHTMLConfig
    ]
});