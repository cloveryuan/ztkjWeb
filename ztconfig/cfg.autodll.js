/**
 * Created by root on 2018/7/31.
 */
'use strict';

var Path = require('path');
// var Merge = require("webpack-merge");
const webpack = require('webpack');
const AutoDllPlugin = require('autodll-webpack-plugin');
const AddDllPlugin = require("dll-webpack-plugin");
let dllConfig_ = require("./cfg.dll.export");
const path_ = require("./cfg.paths");

let libEntry_ = {
    libcom: [
        "jquery",
        "moment",
        'react',
        'react-dom',
        Path.resolve(path_.paths.appSrc, "common/data-flex.less"),],
    libantd: ["antd"],
    appconfig: [Path.resolve(path_.paths.appSrc, "common/app-settings")],
};

function addAutoDllPlugin(parent_config) {
    return new AutoDllPlugin({
        context: path_.paths.appPath,
        inject: true, // will inject the DLL bundle to index.html
        debug: false,
        filename: '[name]_[hash].js',
        path: "static/js",
        entry: libEntry_,
        inherit: true,
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                compress: {
                    warnings: false,
                    comparisons: false,
                },
                mangle: false,
                output: {
                    comments: false,
                    ascii_only: true,
                },
                sourceMap: false,
            }),
        ],
    });
}

function addDllPlugin() {
    return new AddDllPlugin({
        dllConfig: dllConfig_
    });
}

module.exports = {
    addAutoDllPlugin, addDllPlugin
};
