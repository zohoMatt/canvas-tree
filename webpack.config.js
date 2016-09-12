/**
 * Created by Zoho on 16/9/12.
 */
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const debug = process.env.NODE_ENV !== "production";

console.log('>> Debug state:', debug, '\n');

module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: {
        'app': './src/main.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
                }
            },
            {
                test: /\.less$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'style!css!autoprefixer-loader?{browsers:[">1%", "last 2 version", "Firefox 15"]}!less'
            },
            {
                test: /index\.html$/,
                loader: 'file-loader?name=index.html'
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'docs'),
        filename: "[name].min.js"
    },
    plugins: debug ? [
        // Clean distribution folder
        new CleanWebpackPlugin(['docs'], {
            root: '/Users/Zoho/Desktop/SoftwareEngineering/PROJECTS/zohoFrank.github.io',
            verbose: true
        })
    ] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
        // Clean distribution folder
        new CleanWebpackPlugin(['docs'], {
            root: '/Users/Zoho/Desktop/SoftwareEngineering/PROJECTS/zohoFrank.github.io',
            verbose: true
        })
    ],
    external: {}
};