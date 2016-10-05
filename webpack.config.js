'use strict';
// core
const path = require('path');
// node_modules
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
// local
const packageConfig = require('./package.json');

if (process.argv.indexOf('-p') !== -1) {
    throw new Error("`-p' does not mean production build.");
}
if (process.argv.indexOf('--optimize-minimize') !== -1) {
    throw new Error("`--optimize-minimize' generates invalid UglifyJsPlugin instance.");
}

const cssLoaders = [
    'raw-loader',
    'postcss-loader',
];
let styleLoader = function (before) {
    return styleLoader.extractTextWebpackPlugin.extract('vue-style-loader',
        [].concat(cssLoaders, before || []).join('!'),
        {
            publicPath: '../'
        });
};
styleLoader.extractTextWebpackPlugin = new ExtractTextWebpackPlugin('css/main.css');

const appConfig = require(`./app/config.js`);

const webpackConfig = {
    context: path.resolve(__dirname),
    entry: [].map((prebuilt) => `script-loader!${prebuilt}`)
        .concat(`./app/config.js`)
        .concat('./app/main.js')
        .concat('./app/css/main.less'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/bundle.js',
        sourceMapFilename: '../tmp/[file].map',
    },
    module: {
        loaders: [
            {
                test: /[.]less$/,
                loader: styleLoader(),
            },
            {
                test: /[.]html$/,
                loader: 'raw-loader!html-minify-loader',
            },
            {
                test: /[.]json$/,
                loader: 'json-loader',
            },
            {
                test: /\.css$/,
                loader: ExtractTextWebpackPlugin.extract(
                    "style-loader", "css-loader?sourceMap!postcss-loader")
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=80000"
            }
        ],
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        host: '0.0.0.0',
        inline: true, // XXX: > specify --inline on the command line (you cannot specify it in the configuration)
        hot: process.argv.indexOf('--hot') !== -1,
    },
    postcss: [
        autoprefixer({
            browsers: [
                'iOS >= 7.0',
                'Android >= 4.2',
                'Safari >= 7',
                'Chrome >= 42',
            ],
        }),
    ],
    plugins: [
        new webpack.IgnorePlugin(/cls-bluebird/, /request-promise/),
        //new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            template: 'app/index.ejs',
        }),
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'jquery': path.join(__dirname, 'node_modules/jquery/dist/jquery'),
        }
    }
};

if (styleLoader.extractTextWebpackPlugin) {
    webpackConfig.plugins.push(styleLoader.extractTextWebpackPlugin);
}

module.exports = webpackConfig;

if (process.argv.indexOf('--config') === -1) {
    require(`./webpack.config`);
}

console.info(`NODE_ENV = ${process.env.NODE_ENV}`);
