import cookie from 'react-cookie'
let token = cookie.load('token');
let postApi = (path) => {
    return path;
};
let loginApi = (path) => {
    console.log(cookie.load)
    return path + '?token=' + token;
};
export default {
    "configUrl": postApi("http://192.168.1.100:8080/config"),
    "mainUrl": postApi("http://192.168.1.100:8080/main"),
    "lumUrl": postApi("http://192.168.1.100:8080/ztmanage/f/api/lum"),
    "totalwarnUrl": postApi("http://192.168.1.100:8080/report/totalwarn"),
    "lstationsUrl": postApi("http://192.168.1.100:8080/ztmanage/f/api/lstations"),
    "letUrl": postApi("http://192.168.1.100:8080/ztmanage/f/api/let"),
    "totaldataUrl": postApi("http://192.168.1.100:8080/report/totaldata"),
    "reportUrl": postApi("http://192.168.1.100:8080/report"),
    "warnUrl": postApi("http://192.168.1.100:8080/report/warn"),
    "dataUrl": postApi("http://192.168.1.100:8080/report/data"),
    "qryaUrl": postApi("http://192.168.1.100:8080/ztmanage/f/api/qrya"),
    "qrycUrl": postApi("http://192.168.1.100:8080/ztmanage/f/api/qryc"),
    "configparaUrl": postApi("http://192.168.1.100:8080/configpara"),
    "loginUrl": loginApi("http://192.168.1.100:8080/ztmanage/a/login"),
}