import React from 'react'
import './h5splayer.scss'
// import '../../../../../../common/h5splay/adapter.js'
import { H5PlayerHelp } from '../../../../../../common/h5splay/h5splayerhelper'

export class H5splayer extends React.Component {
    private playpause: any = null;
    private h5videodiv: any = null;
    private h5video: any = null
    private v1: any = null;
    componentDidMount() {
        if (H5PlayerHelp.H5siOS() === true
            || H5PlayerHelp.H5sSafariBrowser() === true) {
            this.h5videodiv.prop('controls', true);
        }
    }

    toggleplay = (e: any) => {
        const conf1 = {
            videoid: 'h5sVideo1',
            // protocol: window.location.protocol, // http: or https:
            protocol: 'http:',
            // host: window.location.host, //localhost:8080
            host: '61.155.96.68:18080',
            rootpath: '/', // '/' or window.location.pathname
            token: 'token1',
            hlsver: 'v1', // v1 is for ts, v2 is for fmp4
            session: 'c1782caf-b670-42d8-ba90-2244d0b0ee83' // session got from login
        };
        this.v1 = H5PlayerHelp.H5sPlayerCreate(conf1);
        if (this.h5video.paused) {
            this.h5video.play();
            if (this.v1 != null) {
                this.v1.disconnect();
                delete this.v1
                this.v1 = null;
            }
            this.v1 = H5PlayerHelp.H5sPlayerCreate(conf1);
            this.v1.connect();
            this.setOpacity(this.playpause, 0);
        } else {
            console.log(this.v1)
            this.v1.disconnect();
            delete this.v1;
            this.v1 = null;
            this.h5video.pause();
            this.setOpacity(this.playpause, 100);
        }
    }
    setOpacity = (ele, opacity) => {
        if (ele.style.opacity !== undefined) {
            /// 兼容FF和GG和新版本IE
            ele.style.opacity = opacity / 100

        } else {
            /// 兼容老版本ie
            ele.style.filter = 'alpha(opacity=' + opacity + ')';
        }
    }

    pauseshow = () => {
        this.setOpacity(this.playpause, 100);
    }

    pausehide = () => {
        this.setOpacity(this.playpause, 0);
    }

    render() {
        return (
            <div
                className="h5videodiv"
                ref={(node) => { this.h5videodiv = node }}
                onMouseEnter={this.pauseshow}
                onMouseLeave={this.pausehide}
            >
                <video
                    className="h5video"
                    id="h5sVideo1"
                    autoPlay={true}
                    webkit-playsinline="true"
                    playsInline={true}
                    ref={(node) => { this.h5video = node }}
                />
                <div
                    className="playpause"
                    id="playpause1"
                    onClick={this.toggleplay}
                    ref={(node) => { this.playpause = node }}
                />
            </div>
        )
    }
}