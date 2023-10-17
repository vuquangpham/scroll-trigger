// node library
const path = require('path');

// package
const packageInfo = require('../package.json');

// webpack
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// dist
const distDirectory = path.join(__dirname, '..', 'dist');

// dev direction
const srcDirectory = path.join(__dirname, '..', 'src');
const devDirectory = path.join(__dirname, '..', 'dev');

// declare paths
const productionDirectoryScript = path.join(__dirname, '..', 'src', '_index.js');
const productionDirectoryStyle = path.join(__dirname, '..', 'src', '_index.scss');

// dev mode
const devDirectoryScript = path.join(__dirname, '..', 'dev', 'index.js');
const devDirectionStyle = path.join(__dirname, '..', 'dev', 'index.scss');

// package info
const packageName = packageInfo.name;
const packageVersion = packageInfo.version;
const packageAuthor = packageInfo.author.name;
const packageHomepage = packageInfo.homepage;
const packageLicense = packageInfo.license;
const packageOutputName = packageInfo.outputName;


/**
 * Webpack
 * */

// webpack banner
const packageBannerConfig = {
    banner:
        `/**
 * ${packageOutputName} v${packageVersion}
 * @author ${packageAuthor}
 * @homepage ${packageHomepage}
 * @license ${packageLicense} ${new Date().getFullYear()}
 */`,
    raw: true
};
const webpackBannerConfig = new webpack.BannerPlugin(packageBannerConfig);

// script file name for production
const fileNameForProduction = `${packageOutputName}.min.js`;

/**
 * Webpack > plugins
 * */
// optimization for production
const webpackOptimization = {
    minimizer: [
        new TerserPlugin({extractComments: false}),
    ],
};

// production CSS file name
const webpackCssOutput = new MiniCssExtractPlugin({
    filename: `${packageOutputName}.min.css`,
});

// html config
const webpackHTMLConfig = new HtmlWebpackPlugin({
    template: path.join(devDirectory, 'index.html'),
    filename: 'index.html',
    inject: true,
});

/**
 * Webpack > Module
 * */
const webpackModuleConfig = {
    rules: [

        {
            test: /\.html$/i,
            loader: "html-loader",
        },

        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', {targets: "defaults"}]
                    ],
                    plugins: ['@babel/plugin-proposal-class-properties']
                }
            }
        },
        {
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {sourceMap: false,},
                },
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                require('postcss-preset-env')({
                                    browsers: 'last 2 versions',
                                }),
                            ],
                        },
                    },
                },
            ],
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: false,
                    },
                },
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                require('postcss-preset-env')({
                                    browsers: 'last 2 versions',
                                }),
                            ],
                        },
                    },
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: false,
                    },
                },
            ],
        },
    ],
};

// export
module.exports = {
    // path
    paths: {
        productionDirectoryScript,
        productionDirectoryStyle,
        devDirectoryScript,
        devDirectionStyle,
        distDirectory,
        srcDirectory,
        devDirectory
    },

    // package
    packageInfo: {
        packageName,
        packageVersion,
        packageAuthor,
        packageHomepage,
        packageLicense,
        packageOutputName
    },

    // webpack

    // common for merge
    webpackCommonConfig: {
        resolve: {
            extensions: ['.ts', '.js', '.json'],
            alias: {
                '@': srcDirectory,
            },
        },
    },

    // module
    webpackModuleConfig,

    // optimization
    webpackOptimization,

    // output
    webpackOutput: {
        filename: fileNameForProduction,
        library: undefined,
        libraryTarget: 'umd',
        globalObject: 'this',
        path: distDirectory,
        umdNamedDefine: true,
    },

    // plugins
    webpackCssOutput,
    webpackBannerConfig,
    webpackHTMLConfig,
};
