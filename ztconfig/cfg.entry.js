const path = require('path');
const glob = require('glob');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path_ = require('./cfg.paths');

function rewireEntry(config, env, party) {
    var input_party_ = party || "";
    var entry_ = {};
    var pattern_ = path_.appPages + "/*";
    var files_ = glob.sync(pattern_, {nodir: false});
    files_.forEach((file_) => {
        var entry_name_ = path.basename(file_);
        if (input_party_ && input_party_ !== entry_name_) {
        } else {
            var index_file_ = file_ + "/" + entry_name_ + ".tsx";
            if (fs.existsSync(index_file_)) {
                entry_[entry_name_] = [require.resolve('babel-polyfill')];
                if (env === 'development') {
                    entry_[entry_name_].push(require.resolve('react-dev-utils/webpackHotDevClient'));
                }
                entry_[entry_name_].push(index_file_);
                config = rewireHtmlPlugin(config, env, entry_name_);
            }
        }
    });
    config["entry"] = entry_;
    return config;
}

function rewireHtmlPlugin(config, env, base_name) {
    var html_plugin_ = new HtmlWebpackPlugin({
        title: path_.appTitle,
        filename: `${base_name}.html`,
        chunks: [base_name],
        inject: true,
        template: path_.htmlTemplate,
        // bundleFiles: {
        //     "libcom": {
        //         "css": "",
        //         "js": path.resolve(path_.paths.appBuild, "static/js/libcom.dll.js"),
        //     },
        // },
        hash: true, // 为静态资源生成hash值
        xhtml: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        },
    });
    config.plugins.push(html_plugin_);
    return config;
}

module.exports = {
    rewireEntry,
};
