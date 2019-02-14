
function H5sPlayerWS(t) {
    this.sourceBuffer,
    this.buffer = [],
    this.t,
    this.s,
    this.i,
    this.o,
    this.h,
    this.l = 0,
    this.u = 0,
    this.S = 0,
    this.v = !1,
    this.k = !1,
    this.p = !1,
    this.H,
    this.P = t,
    console.log("Websocket Conf:", t),
    this.C = t.videoid,
    this.W = t.token,
    void 0 === this.C ? (this.I = t.videodom, console.log(t.token, "use dom directly")) : (this.I = document.getElementById(this.C), console.log(t.token, "use videoid")),
    this.s = this.I;
    var s = this.P.protocol + "//" + this.P.host + this.P.rootpath + "api/v1/GetImage?token=" + this.W + "&session=" + this.P.session;
    this.I.setAttribute("poster", s)
}

function H5sPlayerHls(t) {
    this.i,
    this.h,
    this.P = t,
    this.C = t.videoid,
    this.W = t.token,
    this.R,
    this.A = t.hlsver,
    void 0 === this.C ? (this.I = t.videodom, console.log(t.token, "use dom directly")) : (this.I = document.getElementById(this.C), console.log(t.token, "use videoid")),
    this.T = this.I,
    this.T.type = "application/x-mpegURL",
    this.M = 0,
    this.m = 0;
    var s = this.P.protocol + "//" + window.location.host + "/api/v1/GetImage?token=" + this.W + "&session=" + this.P.session;
    this.I.setAttribute("poster", s)
}

function H5sPlayerRTC(t) {
    this.i,
    this.o,
    this.h,
    this.l = 0,
    this.u = 0,
    this.S = 0,
    this.v = !1,
    this.k = !1,
    this.P = t,
    this.C = t.videoid,
    this.W = t.token,
    void 0 === this.C ? (this.I = t.videodom, console.log(t.token, "use dom directly")) : (this.I = document.getElementById(this.C), console.log(t.token, "use videoid")),
    this.s = this.I,
    this.O = null,
    this.g = {
        optional: [{
            DtlsSrtpKeyAgreement: !0
        }]
    },
    this.B = {
        mandatory: {
            offerToReceiveAudio: !0,
            offerToReceiveVideo: !0
        }
    },
    this.J = {
        N: []
    },
    this.L = [];
    var s = this.P.protocol + "//" + this.P.host + this.P.rootpath + "api/v1/GetImage?token=" + this.W + "&session=" + this.P.session;
    this.I.setAttribute("poster", s)
}

function createRTCSessionDescription(t) {
    return console.log("createRTCSessionDescription "),
    new RTCSessionDescription(t)
}

function H5sPlayerAudio(t) {
    this.buffer = [],
    this.i,
    this.v = !1,
    this.k = !1,
    this.P = t,
    console.log("Aduio Player Conf:", t),
    this.W = t.token,
    this.D = new AudioContext
}

function H5sPlayerAudBack(t) {
    this.buffer = [],
    this.i,
    this.v = !1,
    this.k = !1,
    this.P = t,
    this.G = 0,
    console.log("Aduio Back Conf:", t),
    this.W = t.token,
    this.D = new AudioContext
}

function float32ToInt16(t) {
    for (l = t.length, buf = new Int16Array(l); l--;) buf[l] = 32767 * Math.min(1, t[l]);
    return buf
}

H5sPlayerWS.prototype.U = function() {
    console.log("Try Reconnect...", this.v),
    !0 === this.v && (console.log("Reconnect..."), this.K(this.W), this.v = !1),
    console.log("Try Reconnect...", this.v)
},

H5sPlayerWS.prototype.V = function(t) {
    var s;
    console.log("H5SWebSocketClient");
    try {
        "http:" == this.P.protocol && (s = "undefined" != typeof MozWebSocket ? new MozWebSocket("ws://" + this.P.host + t) : new WebSocket("ws://" + this.P.host + t)),
        "https:" == this.P.protocol && (console.log(this.P.host), s = "undefined" != typeof MozWebSocket ? new MozWebSocket("wss://" + this.P.host + t) : new WebSocket("wss://" + this.P.host + t)),
        console.log(this.P.host)
    } catch(t) {
        return void alert("error")
    }
    return s
},

H5sPlayerWS.prototype.j = function() {
    if (null !== this.sourceBuffer && void 0 !== this.sourceBuffer) {
        if (0 !== this.buffer.length && !this.sourceBuffer.updating) try {
            var t = this.buffer.shift(),
            s = new Uint8Array(t);
            this.sourceBuffer.appendBuffer(s)
        } catch(t) {
            console.log(t)
        }
    } else console.log(this.sourceBuffer, "is null or undefined")
},

H5sPlayerWS.prototype.q = function() {
    try {
        this.i.send("keepalive")
    } catch(t) {
        console.log(t)
    }
},

H5sPlayerWS.prototype.F = function(t) {
    if (!0 !== this.k) return ! 1 === this.p ? (this.H = String.fromCharCode.apply(null, new Uint8Array(t.data)), this.X(this), void(this.p = !0)) : (this.buffer.push(t.data), void this.j())
},

H5sPlayerWS.prototype.X = function(t) {
    try {
        window.MediaSource = window.MediaSource || window.WebKitMediaSource,
        window.MediaSource || console.log("MediaSource API is not available");
        var s = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
        "MediaSource" in window && MediaSource.isTypeSupported(s) ? console.log("MIME type or codec: ", s) : console.log("Unsupported MIME type or codec: ", s),
        t.t = new window.MediaSource,
        t.s.autoplay = !0,
        console.log(t.C);
        t.s.src = window.URL.createObjectURL(t.t),
        t.s.play(),
        t.t.addEventListener("sourceopen", t.Y.bind(t), !1)
    } catch(t) {
        console.log(t)
    }
},

H5sPlayerWS.prototype.Y = function() {
    console.log("Add SourceBuffer"),
    this.sourceBuffer = this.t.addSourceBuffer(this.H),
    this.t.duration = 1 / 0,
    this.t.removeEventListener("sourceopen", this.Y, !1),
    this.sourceBuffer.addEventListener("updateend", this.j.bind(this), !1)
},

H5sPlayerWS.prototype.K = function(t) {
    this.s.autoplay = !0;
    var s = "api/v1/h5swsapi";
    s = this.P.rootpath + s + "?token=" + t + "&session=" + this.P.session,
    console.log(s),
    this.i = this.V(s),
    console.log("setupWebSocket", this.i),
    this.i.binaryType = "arraybuffer",
    (this.i.Z = this).i.onmessage = this.F.bind(this),
    this.i.onopen = function() {
        console.log("wsSocket.onopen", this.Z),
        this.Z.o = setInterval(this.Z.$.bind(this.Z), 1e4),
        this.Z.h = setInterval(this.Z.q.bind(this.Z), 1e3)
    },
    this.i.onclose = function() {
        console.log("wsSocket.onclose", this.Z),
        !0 === this.Z.k ? console.log("wsSocket.onclose disconnect") : this.Z.v = !0,
        this.Z._(this.Z),
        this.Z.tt(this.Z),
        this.Z.H = "",
        this.Z.p = !1
    }
},

H5sPlayerWS.prototype._ = function(t) {
    console.log("Cleanup Source Buffer", t);
    try {
        t.sourceBuffer.removeEventListener("updateend", t.j, !1),
        t.sourceBuffer.abort(),
        document.documentMode || /Edge/.test(navigator.userAgent) ? console.log("IE or EDGE!") : t.t.removeSourceBuffer(t.sourceBuffer),
        t.sourceBuffer = null,
        t.t = null,
        t.buffer = []
    } catch(t) {
        console.log(t)
    }
},

H5sPlayerWS.prototype.tt = function(t) {
    console.log("CleanupWebSocket", t),
    clearInterval(t.h),
    clearInterval(t.o),
    t.l = 0,
    t.u = 0,
    t.S = 0
},

H5sPlayerWS.prototype.$ = function() { ! 0 === this.k && (console.log("CheckSourceBuffer has been disconnect", this), clearInterval(this.h), clearInterval(this.o), clearInterval(this.st));
    try {
        if (console.log("CheckSourceBuffer", this), this.sourceBuffer.buffered.length <= 0) {
            if (this.l++, 8 < this.l) return console.log("CheckSourceBuffer Close 1"),
            void this.i.close()
        } else {
            this.l = 0;
            this.sourceBuffer.buffered.start(0);
            var t = this.sourceBuffer.buffered.end(0),
            s = t - this.s.currentTime;
            if (5 < s || s < 0) return console.log("CheckSourceBuffer Close 2", s),
            void this.i.close();
            if (t == this.u) {
                if (this.S++, 3 < this.S) return console.log("CheckSourceBuffer Close 3"),
                void this.i.close()
            } else this.S = 0;
            this.u = t
        }
    } catch(t) {
        console.log(t)
    }
},

H5sPlayerWS.prototype.connect = function() {
    this.K(this.W),
    this.st = setInterval(this.U.bind(this), 3e3)
},

H5sPlayerWS.prototype.disconnect = function() {
    console.log("disconnect", this),
    this.k = !0,
    clearInterval(this.st),
    null != this.i && (this.i.close(), this.i = null),
    console.log("disconnect", this)
},

H5sPlayerHls.prototype.V = function(t) {
    var s;
    console.log("H5SWebSocketClient");
    try {
        "http:" == this.P.protocol && (s = "undefined" != typeof MozWebSocket ? new MozWebSocket("ws://" + this.P.host + t) : new WebSocket("ws://" + this.P.host + t)),
        "https:" == this.P.protocol && (console.log(this.P.host), s = "undefined" != typeof MozWebSocket ? new MozWebSocket("wss://" + this.P.host + t) : new WebSocket("wss://" + this.P.host + t)),
        console.log(this.P.host)
    } catch(t) {
        return void alert("error")
    }
    return s
},

H5sPlayerHls.prototype.q = function() {
    try {
        var t = {
            type: "keepalive"
        };
        this.i.send(JSON.stringify(t))
    } catch(t) {
        console.log(t)
    }
},

H5sPlayerHls.prototype.F = function(t) {
    console.log("HLS received ", t.data)
},

H5sPlayerHls.prototype.K = function(t) {
    var s = "api/v1/h5swscmnapi";
    s = this.P.rootpath + s + "?token=" + t,
    console.log(s),
    this.i = this.V(s),
    console.log("setupWebSocket", this.i),
    this.i.binaryType = "arraybuffer",
    (this.i.Z = this).i.onmessage = this.F.bind(this),
    this.i.onopen = function() {
        console.log("wsSocket.onopen", this.Z),
        this.Z.h = setInterval(this.Z.q.bind(this.Z), 1e3)
    },
    this.i.onclose = function() {
        console.log("wsSocket.onclose", this.Z),
        this.Z.tt(this.Z)
    }
},

H5sPlayerHls.prototype.tt = function(t) {
    console.log("H5sPlayerHls CleanupWebSocket", t),
    clearInterval(t.h)
},

H5sPlayerHls.prototype.et = function() {
    console.log("HLS video.ended", this.T.ended),
    console.log("HLS video.currentTime", this.T.currentTime);
    var t = this.T.currentTime,
    s = t - this.M;
    console.log("HLS diff", s),
    0 === s && this.m++,
    this.M = t,
    3 < this.m && (null != this.i && (this.i.close(), this.i = null), this.K(this.W), console.log("HLS reconnect"), this.T.src = "", this.M = 0, this.m = 0, this.T.src = this.P.protocol + "//" + this.P.host + this.P.rootpath + "hls/" + this.A + "/" + this.W + "/hls.m3u8", this.T.play())
},

H5sPlayerHls.prototype.connect = function() {
    this.K(this.W),
    this.M = 0,
    this.m = 0,
    this.T.onended = function(t) {
        console.log("The End")
    },
    this.T.onpause = function(t) {
        console.log("Pause")
    },
    this.T.onplaying = function(t) {
        console.log("Playing")
    },
    this.T.onseeking = function(t) {
        console.log("seeking")
    },
    this.T.onvolumechange = function(t) {
        console.log("volumechange")
    },
    this.T.src = this.P.protocol + "//" + this.P.host + this.P.rootpath + "hls/" + this.A + "/" + this.W + "/hls.m3u8",
    this.T.play(),
    this.R = setInterval(this.et.bind(this), 3e3)
},

H5sPlayerHls.prototype.disconnect = function() {
    clearInterval(this.R),
    this.M = 0,
    this.m = 0,
    null != this.i && (this.i.close(), this.i = null),
    console.log("disconnect", this)
},

H5sPlayerRTC.prototype.U = function() {
    console.log("Try Reconnect...", this.v),
    !0 === this.v && (console.log("Reconnect..."), this.K(this.W), this.v = !1),
    console.log("Try Reconnect...", this.v)
},

H5sPlayerRTC.prototype.V = function(t) {
    var s;
    console.log("H5SWebSocketClient");
    try {
        "http:" == this.P.protocol && (s = "undefined" != typeof MozWebSocket ? new MozWebSocket("ws://" + this.P.host + t) : new WebSocket("ws://" + this.P.host + t)),
        "https:" == this.P.protocol && (console.log(this.P.host), s = "undefined" != typeof MozWebSocket ? new MozWebSocket("wss://" + this.P.host + t) : new WebSocket("wss://" + this.P.host + t)),
        console.log(this.P.host)
    } catch(t) {
        return void alert("error")
    }
    return s
},

H5sPlayerRTC.prototype.q = function() {
    try {
        var t = {
            type: "keepalive"
        };
        this.i.send(JSON.stringify(t))
    } catch(t) {
        console.log(t)
    }
},

H5sPlayerRTC.prototype.it = function(t) {
    if (t.candidate) {
        var s;
        console.log("onIceCandidate currentice", t.candidate),
        s = t.candidate,
        console.log("onIceCandidate currentice", s, JSON.stringify(s));
        var e = JSON.parse(JSON.stringify(s));
        e.type = "remoteice",
        console.log("onIceCandidate currentice new", e, JSON.stringify(e)),
        this.i.send(JSON.stringify(e))
    } else console.log("End of candidates.")
},

H5sPlayerRTC.prototype.ot = function(t) {
    var s;
    console.log("Remote track added:" + JSON.stringify(t)),
    s = t.nt ? t.nt[0] : t.stream;
    var e = this.I;
    e.src = URL.createObjectURL(s),
    e.play()
},

H5sPlayerRTC.prototype.ht = function() {
    console.log("createPeerConnection  config: " + JSON.stringify(this.J) + " option:" + JSON.stringify(this.g));
    var s = new RTCPeerConnection(this.J, this.g),
    e = this;
    return s.onicecandidate = function(t) {
        e.it.call(e, t)
    },
    void 0 !== s.ct ? s.ct = function(t) {
        e.ot.call(e, t)
    }: s.onaddstream = function(t) {
        e.ot.call(e, t)
    },
    s.oniceconnectionstatechange = function(t) {
        console.log("oniceconnectionstatechange  state: " + s.iceConnectionState)
    },
    console.log("Created RTCPeerConnnection with config: " + JSON.stringify(this.J) + "option:" + JSON.stringify(this.g)),
    s
},

H5sPlayerRTC.prototype.rt = function(t) {
    console.log("ProcessRTCOffer", t);
    try {
        this.O = this.ht(),
        this.L.length = 0;
        var s = this;
        this.O.setRemoteDescription(createRTCSessionDescription(t)),
        this.O.createAnswer(this.B).then(function(t) {
            console.log("Create answer:" + JSON.stringify(t)),
            s.O.setLocalDescription(t,
            function() {
                console.log("ProcessRTCOffer createAnswer", t),
                s.i.send(JSON.stringify(t))
            },
            function() {})
        },
        function(t) {
            alert("Create awnser error:" + JSON.stringify(t))
        })
    } catch(t) {
        this.disconnect(),
        alert("connect error: " + t)
    }
},

H5sPlayerRTC.prototype.lt = function(t) {
    console.log("ProcessRemoteIce", t);
    try {
        var s = new RTCIceCandidate({
            sdpMLineIndex: t.sdpMLineIndex,
            candidate: t.candidate
        });
        console.log("ProcessRemoteIce", s),
        console.log("Adding ICE candidate :" + JSON.stringify(s)),
        this.O.addIceCandidate(s,
        function() {
            console.log("addIceCandidate OK")
        },
        function(t) {
            console.log("addIceCandidate error:" + JSON.stringify(t))
        })
    } catch(t) {
        alert("connect ProcessRemoteIce error: " + t)
    }
},

H5sPlayerRTC.prototype.F = function(t) {
    console.log("RTC received ", t.data);
    var s = JSON.parse(t.data);
    console.log("Get Message type ", s.type),
    "offer" === s.type && (console.log("Process Message type ", s.type), this.rt(s)),
    "remoteice" === s.type && (console.log("Process Message type ", s.type), this.lt(s))
},

H5sPlayerRTC.prototype.K = function(t) {
    this.s.autoplay = !0;
    var s = "api/v1/h5srtcapi";
    s = this.P.rootpath + s + "?token=" + t,
    console.log(s),
    this.i = this.V(s),
    console.log("setupWebSocket", this.i),
    this.i.binaryType = "arraybuffer",
    (this.i.Z = this).i.onmessage = this.F.bind(this),
    this.i.onopen = function() {
        console.log("wsSocket.onopen", this.Z);
        var t = {
            type: "open"
        };
        this.Z.i.send(JSON.stringify(t)),
        this.Z.h = setInterval(this.Z.q.bind(this.Z), 1e3)
    },
    this.i.onclose = function() {
        console.log("wsSocket.onclose", this.Z),
        !0 === this.Z.k ? console.log("wsSocket.onclose disconnect") : this.Z.v = !0,
        this.Z.tt(this.Z)
    }
},

H5sPlayerRTC.prototype.tt = function(t) {
    console.log("CleanupWebSocket", t),
    clearInterval(t.h),
    t.l = 0,
    t.u = 0,
    t.S = 0
},

H5sPlayerRTC.prototype.connect = function() {
    this.K(this.W),
    this.st = setInterval(this.U.bind(this), 3e3)
},

H5sPlayerRTC.prototype.disconnect = function() {
    console.log("disconnect", this),
    this.k = !0,
    clearInterval(this.st),
    null != this.i && (this.i.close(), this.i = null),
    console.log("disconnect", this)
},

H5sPlayerAudio.prototype.V = function(t) {
    var s;
    console.log("H5SWebSocketClient");
    try {
        "http:" == this.P.protocol && (s = "undefined" != typeof MozWebSocket ? new MozWebSocket("ws://" + this.P.host + t) : new WebSocket("ws://" + this.P.host + t)),
        "https:" == this.P.protocol && (console.log(this.P.host), s = "undefined" != typeof MozWebSocket ? new MozWebSocket("wss://" + this.P.host + t) : new WebSocket("wss://" + this.P.host + t)),
        console.log(this.P.host)
    } catch(t) {
        return void alert("error")
    }
    return s
},

H5sPlayerAudio.prototype.q = function() {
    try {
        this.i.send("keepalive")
    } catch(t) {
        console.log(t)
    }
},

H5sPlayerAudio.prototype.F = function(t) {
    for (var s = new Int16Array(t.data), e = s.length, i = this.D.createBuffer(1, e, 8e3), o = 0; o < 1; o++) for (var n = i.getChannelData(o), h = 0; h < e; h++) n[h] = s[h] / 16383.5;
    var c = this.D.createBufferSource();
    c.buffer = i,
    c.connect(this.D.destination),
    c.start()
},

H5sPlayerAudio.prototype.tt = function(t) {
    console.log("CleanupWebSocket", t),
    clearInterval(t.h)
},

H5sPlayerAudio.prototype.K = function(t) {
    var s = "api/v1/h5saudapi";
    s = this.P.rootpath + s + "?token=" + t + "&session=" + this.P.session,
    console.log(s),
    this.i = this.V(s),
    console.log("setupWebSocket for audio", this.i),
    this.i.binaryType = "arraybuffer",
    (this.i.Z = this).i.onmessage = this.F.bind(this),
    this.i.onopen = function() {
        console.log("wsSocket.onopen", this.Z),
        this.Z.h = setInterval(this.Z.q.bind(this.Z), 1e3)
    },
    this.i.onclose = function() {
        console.log("wsSocket.onclose", this.Z),
        this.Z.tt(this.Z)
    }
},

H5sPlayerAudio.prototype.connect = function() {
    this.K(this.W)
},

H5sPlayerAudio.prototype.disconnect = function() {
    console.log("disconnect", this),
    null != this.i && (this.i.close(), this.i = null),
    console.log("disconnect", this)
},

H5sPlayerAudBack.prototype.V = function(t) {
    var s;
    console.log("H5SWebSocketClient");
    try {
        "http:" == this.P.protocol && (s = "undefined" != typeof MozWebSocket ? new MozWebSocket("ws://" + this.P.host + t) : new WebSocket("ws://" + this.P.host + t)),
        "https:" == this.P.protocol && (console.log(this.P.host), s = "undefined" != typeof MozWebSocket ? new MozWebSocket("wss://" + this.P.host + t) : new WebSocket("wss://" + this.P.host + t)),
        console.log(this.P.host)
    } catch(t) {
        return void alert("error")
    }
    return s
},

H5sPlayerAudBack.prototype.q = function() {
    try {
        this.i.send("keepalive")
    } catch(t) {
        console.log(t)
    }
},

H5sPlayerAudBack.prototype.F = function(t) {},

H5sPlayerAudBack.prototype.tt = function(t) {
    console.log("CleanupWebSocket", t),
    clearInterval(t.h)
},

H5sPlayerAudBack.prototype.at = function(t) {
    console.log("wsSocket.onopen", this);
    try {
        navigator.getUserMedia({
            s: !1,
            ut: !0
        },
        this.ft.bind(this))
    } catch(t) {
        return void alert("Audio intecomm error", t)
    }
},

H5sPlayerAudBack.prototype.K = function(t) {
    var s = "api/v1/h5saudbackapi";
    s = this.P.rootpath + s + "?token=" + t + "&session=" + this.P.session,
    console.log(s),
    this.i = this.V(s),
    console.log("setupWebSocket for audio back", this.i),
    this.i.binaryType = "arraybuffer",
    (this.i.Z = this).i.onmessage = this.F.bind(this),
    this.i.onopen = this.at.bind(this),
    this.i.onclose = function() {
        console.log("wsSocket.onclose", this.Z),
        this.Z.tt(this.Z)
    }
},

H5sPlayerAudBack.prototype.dt = function(t) {
    var s = float32ToInt16(t.inputBuffer.getChannelData(0));
    this.i.send(s)
},

H5sPlayerAudBack.prototype.ft = function(t) {
    try {
        var s = this.D.createMediaStreamSource(t);
        console.log("sampleRate", this.D.sampleRate);
        var e = this.D.createScriptProcessor(256, 1, 1);
        s.connect(e),
        e.connect(this.D.destination),
        e.onaudioprocess = this.dt.bind(this)
    } catch(t) {
        return void alert("Audio intecomm error", t)
    }
},

H5sPlayerAudBack.prototype.connect = function() {
    this.K(this.W)
},

H5sPlayerAudBack.prototype.disconnect = function() {
    console.log("disconnect", this),
    null != this.i && (this.i.close(), this.i = null),
    console.log("disconnect", this)
};
module.exports = {
    H5sPlayerWS, H5sPlayerHls, H5sPlayerRTC, createRTCSessionDescription, H5sPlayerAudio, H5sPlayerAudBack, float32ToInt16
};