/**
 * Created by admin on 17/4/9.
 */
'use strict';

import assign from "object-assign";
import rccookie from "react-cookie";
import {gSet} from "./app-settings";
// import request from "superagent";
import $ from "jquery";

let gAjax = {};

// gAjax.postRequest = (options) => {
//     let {url: url_, data: param_, done: fn_do_} = options;
//     if (!param_) {
//         param_ = {}
//     }
//     let post_url_ = gSet.server_url + url_;
//     request.post(post_url_)
//         .set("Access-Control-Allow-Origin", "*")
//         .send(param_)
//         // .on("error", fn_fail_)
//         .end(fn_do_);
// }

gAjax.postRequest = (options) => {
    let {url: url_, data: param_, done: fn_do_} = options;
    if (!param_) {
        param_ = {};
    }
    let post_url_ = gSet.server_url + url_;
    $.ajax({
        context: this,
        url: post_url_,
        // type: "GET",
        type: "POST",
        // dataType: "JSONP",
        // async: true
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        data: param_,
    }).done(function (res) {
        let ret_code_ = parseInt(res.ret);
        if (100001 == ret_code_) {
            window.location.href = "loginwindow.html";
        }
        let body_ok_ = (0 == ret_code_);
        let res_ = {};
        if (body_ok_) {
            res_["ok"] = true;
            res_["error"] = false;
        } else {
            res_["ok"] = false;
            res_["error"] = {code: ret_code_, message: res.msg || res.detailErrorMsg};
            console.log(res.msg, res);
        }
        res_["body"] = res.content;
        if (fn_do_) fn_do_(res_);
    }).fail(function (xhr, status, err) {
        console.log(xhr, status, err.toString());
        let res_ = {};
        res_["error"] = {code: -1, "message": err.toString()};
        res_["ok"] = false;
        res_["body"] = "";
        if (fn_do_) fn_do_(res_);
    });

};

gAjax.loginServer = (options) => {
    let new_options_ = assign({}, options, {url: gSet.url_login});
    gAjax.postRequest(new_options_);
};

gAjax.logoutServer = (options) => {
    let new_options_ = assign({}, options, {url: gSet.url_logout});
    gAjax.postRequest(new_options_);
    gAjax.clearLoaclStorage();
    rccookie.remove(gSet.key_pwd);
    rccookie.remove(gSet.key_state);
};

gAjax.saveLoginSuccessInfo = (data, userMenus) => {
    let result_ = "";
    if (data) {
        rccookie.save(gSet.key_usr, data.username);
        rccookie.save(gSet.key_pwd, data.password);
        rccookie.save(gSet.key_state, data.save_state);
    } else {
        rccookie.remove(gSet.key_usr);
        rccookie.remove(gSet.key_pwd);
        rccookie.remove(gSet.key_state);
    }
    let first_right_ = 0;
    let right_ = [];
    for (let index_ in userMenus) {
        first_right_ += 1;
        right_.push(userMenus[index_].id);
    }
    if (first_right_) {
        right_.sort();
        result_ = gSet.functions_url[right_[0] - 1];
    }
    window.sessionStorage.setItem(gSet.session_rights, right_);
    return result_;
};

gAjax.clearLoaclStorage = () => {
    window.localStorage.clear();
};

export default gAjax;
export {gAjax};

