// webpack
const {merge} = require("webpack-merge");

// config
const config = require('./config');

// entry
const entry = [config.paths.productionDirectoryScript];

/**
 * Build for production
 * */
// export
module.exports = merge(config.webpackCommonConfig, {
    mode: "production",
    entry,
    output: config.webpackOutput,
    experiments: {},
    optimization: config.webpackOptimization,
    module: config.webpackModuleConfig,
    plugins: [
        config.webpackCssOutput,
        config.webpackBannerConfig
    ],
});