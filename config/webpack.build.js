// webpack
const {merge} = require("webpack-merge");

// config
const config = require('./config');

// entry
const entry = [config.paths.devDirectoryScript];

/**
 * Build for production server with HTML
 * */

// export
module.exports = merge(config.webpackCommonConfig, {
    mode: "production",
    entry,
    output: config.webpackOutput,
    experiments: {},
    module: config.webpackModuleConfig,
    optimization: config.webpackOptimization,
    plugins: [
        // CSS for output
        config.webpackCssOutput,

        // HTML for output
        config.webpackHTMLConfig,
    ],
});