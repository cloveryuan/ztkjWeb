const path = require('path');
const paths = require('react-scripts-ts-antd/config/paths');

module.exports = {
    appTitle: "紫图科技--ZtManage v2.0",
    appPages: path.resolve(paths.appSrc, "pages"),
    // htmlTemplate: paths.appHtml,
    htmlTemplate: path.resolve(paths.appSrc, "common/mywebtemplate.html"),
    libTemplate: path.resolve(paths.appSrc, "common/mywebtemplatelib.html"),
    paths: paths,
};
