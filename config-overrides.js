const {modifyConfig} = require('./ztconfig/cfg.config');
module.exports = function override(config, env) {
    config = modifyConfig(config, env);
    console.log("last webpack config:\n", config);
    return config;
};