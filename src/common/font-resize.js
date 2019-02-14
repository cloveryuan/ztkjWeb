/**
 * Created by admin on 17/4/7.
 */
'use strict';

let default_height = 800;
let default_fontsize = 14;
let win = window;
let flex = (e, t) => {
    let a_ = e || 100,
        n_ = t || 1,
        r_ = win.document,
        o_ = navigator.userAgent,
        d_ = o_.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i),
        l_ = o_.match(/U3\/((\d+|\.){5,})/i),
        c_ = l_ && parseInt(l_[1].split(".").join(""), 10) >= 80,
        p_ = navigator.appVersion.match(/(iphone|ipad|ipod)/gi),
        s_ = win.devicePixelRatio || 1;
    p_ || d_ && d_[1] > 534 || c_ || (s_ = 1);
    let u_ = 1 / s_,
        m = r_.querySelector('meta[name="viewport"]');
    m || (m = r_.createElement("meta"), m.setAttribute("name", "viewport"), r_.head.appendChild(m)),
        m.setAttribute("content", "width=device-width,user-scalable=no,initial-scale=" + u_
            + ",maximum-scale=" + u_ + ",minimum-scale=" + u_),
        r_.documentElement.style.fontSize = a_ / 2 * s_ * n_ + "px";
};

let fontresize = (design_height) => {
    let height_ = design_height || default_height;
    let r_ = win.document;
    // let win_w_ = win.innerWidth;
    // let factor_ = win_w_ / width_;
    let win_h_ = win.innerHeight;
    let factor_ = win_h_ / height_;
    let new_font_size_ = default_fontsize * factor_;
    r_.documentElement.style.fontSize = new_font_size_ + "px";
};

export { fontresize as default, fontresize as fontResize, flex };
