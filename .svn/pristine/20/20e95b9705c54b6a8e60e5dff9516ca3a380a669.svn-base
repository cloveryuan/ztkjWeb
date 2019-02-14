import reqwest from 'reqwest'

let Api = 'http://180.96.28.83:80'
var header = {
    'Accept': 'application/json',
    'content-type': 'application/json',
    'Authorization': null,
}

function getReq(url, data, suc, err) {
    reqwest({
        url: Api + url,
        method: 'get',
        header: header,
        data: data,
        success: function (res) {
            return typeof suc == "function" && suc(res)
        },
        error: function () {
            return typeof err == "function" && err()
        }
    })
}

function postReq(url, data, suc, err, then) {
    new Promise((resolve, reject) => {
        reqwest({
            url: Api + url,
            header: header,
            data: data,
            method: 'post',
            success: function (res) {
                resolve(1)
                return typeof suc == "function" && suc(res)
            },
            error: function () {
                return typeof err == "function" && err()
            }
        })
    }).then(() => { return typeof then == "function" && then() })
}

const http = {
    getReq: getReq,
    postReq: postReq,
    header: header,
    Api: Api
}

export default http