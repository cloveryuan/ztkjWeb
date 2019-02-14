/**
 * Created by root on 2018/7/31.
 */
'use strict';
var Path = require('path');
const path_ = require("./cfg.paths");
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// var AssetsPlugin = require('assets-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const customLoaders = require('./cfg.loaders');
// const dllBuildPath_ = path_.paths.appBuild;
const dllBuildPath_ = path_.paths.appPublic;
// const distCssFilename_ = 'static/css/[name].css';
const distCssFileName_ = '../css/[name].css';

let libEntry_ = {
    // "appconfig": [Path.resolve(path_.paths.appSrc, "common/app-settings")],
    "libcom": [
        "jquery",
        "moment",
        'react',
        'react-dom',
        Path.resolve(path_.paths.appSrc, "common/data-flex.less"),],
    "libantd": ["antd",
        Path.resolve(path_.paths.appNodeModules, "antd/dist/antd.less")],
};

function exportDll() {
    let comSetting_ = {
        devtool: false,
        output: {
            path: Path.resolve(dllBuildPath_, "static", "js"),
            publicPath: "static/js",
            filename: "[name].dll.js",
            chunkFilename: "[id].bundle.js",
            library: "[name]_[chunkhash]",
            pathinfo: false,
        },
        externals: [],
        entry: libEntry_,
        module: {
            strictExportPresence: true,
            rules: [
                // TODO: Disable require.ensure as it's not a standard language feature.
                // We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
                // { parser: { requireEnsure: false } },
                {
                    test: /\.(js|jsx|mjs)$/,
                    loader: require.resolve('source-map-loader'),
                    enforce: 'pre',
                    include: path_.paths.appSrc,
                }, {
                    // "oneOf" will traverse all following loaders until one will
                    // match the requirements. When no loader matches it will fall
                    // back to the "file" loader at the end of the loader list.
                    oneOf: [
                        customLoaders.urlLoader,
                        customLoaders.jsLoaderCustom,
                        customLoaders.tsLoader,
                        customLoaders.cssLoaderProd,
                        customLoaders.scssLoaderCustom,
                        customLoaders.lessLoaderCustom,
                        customLoaders.svgLoaderCustom,
                        customLoaders.fileLoader,
                    ],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(["build", "public/static", "public/assets-manifest.json"], {
                    "root": path_.paths.appPath,// 一个根的绝对路径.
                    "verbose": true,// 将log写到 console.
                    "dry": false,// 不要删除任何东西，主要用于测试.
                    "exclude": []//排除不删除的目录，主要用于避免删除公用的文件
                }
            ),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    comparisons: false,
                },
                mangle: {
                    safari10: true,
                },
                output: {
                    comments: false,
                    ascii_only: true,
                },
                sourceMap: false,
            }),
            //在 plugin 中添加
            new CompressionWebpackPlugin({ //gzip 压缩
                asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(js|css)$'), // 压缩 js 与 css
                threshold: 10240,
                minRatio: 0.8
            }),
            new HtmlWebpackPlugin({              // 利用该插件实现vendor被插入到html中
                title: path_.appTitle,
                filename: path_.htmlTemplate,
                template: path_.libTemplate,
                inject: 'body',
                hash: true,
                minify: false
            }),
            new ExtractTextPlugin(distCssFileName_),
            // new AssetsPlugin({
            //     filename: 'assets-manifest.json',
            //     path: path_.paths.appPublic,
            //     update: true,
            //     prettyPrint: true,
            // }),
            // new webpack.DllPlugin({
            //     path: Path.resolve(dllBuildPath_, "static", 'bundle-' + lib_name + '-manifest.json'),
            //     name: "[name]_[chunkhash]",
            //     context: Path.resolve(dllBuildPath_, "static"),
            // }),
            new webpack.DllPlugin({
                path: Path.resolve(dllBuildPath_, "static", 'bundle-[name]-manifest.json'),
                name: "[name]_[chunkhash]",
                context: Path.resolve(dllBuildPath_, "static"),
            }),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new ForkTsCheckerWebpackPlugin({
                async: false,
                tsconfig: path_.paths.appTsConfig,
                tslint: path_.paths.appTsLint,
            }),
        ],
        resolve: {
            modules: ['node_modules', path_.paths.appNodeModules],
            extensions: [
                '.mjs',
                '.web.ts',
                '.ts',
                '.web.tsx',
                '.tsx',
                '.web.js',
                '.js',
                '.json',
                '.web.jsx',
                '.jsx',
            ],
            alias: {
                'babel-runtime': Path.dirname(
                    require.resolve('babel-runtime/package.json')
                ),
                'react-native': 'react-native-web',
            },
            plugins: [
                new ModuleScopePlugin(path_.paths.appSrc, [path_.paths.appPackageJson]),
                new TsconfigPathsPlugin({configFile: path_.paths.appTsConfig})
            ],
        },
    };
    return comSetting_;
}

function importDll() {
    let result_dll_reference_plugins_ = [];
    for (let lib_name_ in libEntry_) {
        var filepath_ = Path.resolve(dllBuildPath_, "static", 'bundle-' + lib_name_ + '-manifest.json');
        result_dll_reference_plugins_.push(new webpack.DllReferencePlugin({
            context: Path.resolve(dllBuildPath_, "static"),
            manifest: require(filepath_),
        }));
    }
    return result_dll_reference_plugins_;
}

// function ignoreDll(lib_name) {
//     new webpack.ProvidePlugin({           // webpack的全局注入，在项目中少写点require
//         React: 'react',
//         ReactCom: 'react-com',
//     })
// }

module.exports = {
    exportDll, importDll
};
