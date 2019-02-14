/**
 * Created by root on 2018/7/31.
 */
'use strict';

const dll_ = require("./cfg.dll.js");
let libBuildConfig_ = dll_.exportDll();
module.exports = libBuildConfig_;
