const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const customLoaders = require('./cfg.loaders');
const {rewireEntry} = require('./cfg.entry');
const {importDll} = require("./cfg.dll");
const path_ = require("./cfg.paths");

function rewireModule(config, env) {
    config["module"] = {
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
            },
            {
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
    };
    return config;
}

function rewireDevModule(config, env) {
    config["module"] = {
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
            },
            {
                // "oneOf" will traverse all following loaders until one will
                // match the requirements. When no loader matches it will fall
                // back to the "file" loader at the end of the loader list.
                oneOf: [
                    customLoaders.urlLoader,
                    customLoaders.jsLoaderCustom,
                    customLoaders.tsLoader,
                    customLoaders.cssLoaderDev,
                    customLoaders.scssLoaderCustomDev,
                    customLoaders.lessLoaderCustomDev,
                    customLoaders.svgLoaderCustom,
                    customLoaders.fileLoader,
                ],
            },
        ],
    };
    return config;
}

function rewirePlugins(config, env) {
    var last_plugins_ = [];
    config.plugins.forEach(plugin => {
        switch (plugin.constructor) {
            case SWPrecacheWebpackPlugin: {
                if (env === 'development') {
                    last_plugins_.push(plugin);
                }
                break;
            }
            case HtmlWebpackPlugin: {
                break;
            }
            case ExtractTextPlugin: {
                if (env === 'production') {
                    last_plugins_.push(plugin);
                }
                break;
            }
            default: {
                last_plugins_.push(plugin);
                break;
            }
        }
    });
    if (env === 'development') {
        last_plugins_.push(
            new webpack.WatchIgnorePlugin([
                /css\.d\.ts$/
            ]),
        );
    } else {
        last_plugins_.push(
            //在 plugin 中添加
            new CompressionWebpackPlugin({ //gzip 压缩
                asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(js|css)$'), // 压缩 js 与 css
                threshold: 10240,
                minRatio: 0.8
            }),
        );
    }
    last_plugins_.concat(importDll());
    config['plugins'] = last_plugins_;
    return config;
}

function rewireOutput(config, env) {
    config["output"]["publicPath"] = "";
    if ('development' === env) {
        config["output"]["filename"] = 'static/js/[name].js';
    }
    return config;
}

function rewireResolveAlias(config, env) {
    config['resolve']['alias']['src'] = path_.paths.appSrc;
    return config;
}

function loadOptions() {
    const args = process.argv.slice(2);
    const scriptIndex = args.findIndex(
        x => x.startsWith('---')
    );
    const script = scriptIndex === -1 ? "" : args[scriptIndex].substring(3);
    return script;
}

function cfgConfig(config, env) {
    const options_ = loadOptions();
    console.log("env: ", env);
    console.log("argv: ", options_);
    if (env === 'development') {
        config['devtool'] = 'cheap-module-inline-source-map';
        config = rewireDevModule(config, env);
    } else if (env === 'production') {
        config['devtool'] = false;
        config = rewireModule(config, env);
    }
    config = rewirePlugins(config, env);
    config = rewireOutput(config, env);
    config = rewireResolveAlias(config, env);
    config = rewireEntry(config, env, options_);
    return config;
}

module.exports = {
    modifyConfig: cfgConfig
};