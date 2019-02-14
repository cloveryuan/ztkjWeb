/**
 * Modifications copyright (C) 2017 David Ćavar
 */

function loadLibs(url) {
    var s1 = document.createElement('script');
    s1.onload = function () {
        playUrl(url);
    };
    // s1.src = 'https://cdn.jsdelivr.net/npm/hls.js@' + hlsjs_version + '/dist/hls.min.js';
    s1.src = 'libs/hls.min.js';
    document.querySelector('head').appendChild(s1);
}

// 
state_machine.addTransitions('loader', [
    {
        from: 'visible', to: 'invisible', object: loader, handle: function (transition) {
            loader.style.visibility = 'collapse';
        }
    },
    {
        from: 'invisible', to: 'visible', object: loader, handle: function (transition) {
            loader.style.visibility = 'visible';
        }
    }
], 'visible');

function reset() {
    if (player != null) {
        player.destroy();
    }

    player = null;
    state_machine.transition('la_url_form', 'invisible');
}

function restoreSettings() {
    debug = false;
    native = false;
    var url = window.location.href.split("#")[1];
    media_url_input.value = url;
    //
    hlsjs_version = settings.hlsjs_version;
    dashjs_version = settings.dashjs_version;
    loadLibs(url);
}

function reloadPlayer(e) {
    state_machine.transition('la_url_form', 'invisible');
    playUrl(media_url_input.value);
}

function prepareLaUrlInput() {
    state_machine.transition('la_url_form', 'visible');
}

window.addEventListener("hashchange", function () {
    var url = window.location.href.split("#")[1];
    playUrl(url);

}, false);

var formatTimeFromSeconds = function (val) {
    var hours = Math.floor(val / 3600);

    if ((hours + '').length == 1) {
        hours = '0' + hours;
    }

    var minutes = Math.floor(val / 60);
    minutes = minutes < 60 ? minutes : (Math.floor(val / 60) - hours * 60);

    if ((minutes + '').length == 1) {
        minutes = '0' + minutes;
    }

    var seconds = val < 60 ? val : val - ((hours * 3600) + (minutes * 60));
    seconds = Math.floor(seconds);

    if ((seconds + '').length == 1) {
        seconds = '0' + seconds;
    }

    return hours + ':' + minutes + ':' + seconds;
};

function playUrl(url) {
    reset();

    player = new Player({
        "url": url,
        "autoplay": true,
        "video_element": video_element,
        "protData": {
            "com.widevine.alpha": {
                "serverURL": la_url.value
            }
        },
        "onLicenseError": function () {
            prepareLaUrlInput();
        },
        "event_handler": function (event) {

            var regex1 = /^(seeking)|(waiting)$/g;

            if (event.type.match(regex1) != null) {
                state_machine.transition('loader', 'visible');
                return;
            }

            switch (event.type) {
                case "loadeddata":
                    fillBitrates(player.getQualities());

                    if (!player.isLive()) {
                        progress.classList.remove('collapsed');
                        time.classList.remove('collapsed');
                        duration.classList.remove('collapsed');
                        duration.innerText = formatTimeFromSeconds(video_element.duration);
                    }

                    break;
                case "hlsNetworkError":
                    state_machine.transition('loader', 'visible');
                    break;
                case 'streamInitialized':
                    fillBitrates(player.getQualities());
                    break;
                case "hlsLevelLoaded":
                    if (event.details != undefined && event.details.live == false) {
                        progress.classList.remove('collapsed');
                        time.classList.remove('collapsed');
                        duration.classList.remove('collapsed');
                        duration.innerText = formatTimeFromSeconds(video_element.duration);
                    }

                    fillBitrates(player.getQualities());
                    break;
                case "manifestLoaded":
                    if (event.data.type == 'static') {
                        progress.classList.remove('collapsed');
                        time.classList.remove('collapsed');
                        duration.classList.remove('collapsed');
                        duration.innerText = formatTimeFromSeconds(video_element.duration);
                    }

                    fillBitrates(player.getQualities());
                    break;
                case 'timeupdate':
                    if (!seek_lock) {
                        var val = (video_element.currentTime / video_element.duration) * 100;
                        progress_range.setValue(val);
                    }

                    var span = document.createElement('span');
                    span.innerText = formatTimeFromSeconds(video_element.currentTime);
                    clearNode(time);
                    time.appendChild(span);
                    break;
                case 'playing':
                    state_machine.transition('play_pause', 'playing');
                    player.setVolume(.5);
                    state_machine.transition('loader', 'invisible');

                    playback_speed_selection.addEventListener('change', function (e) {
                        player.setPlaybackRate(e.value);
                    });

                    break;
                case 'pause':
                    state_machine.transition('play_pause', 'paused');
                    break;
                case 'volumechange':
                    volume_range.setValue(video_element.volume * 100);
                    break;
            }
        },
        "debug": false,
    });
}

var close_input = document.getElementsByClassName('close-input');

for (var i = 0; i < close_input.length; i++) {
    close_input[i].addEventListener('click', function (e) {
        state_machine.transition(e.target.getAttribute('data-target'), 'invisible');
    }, false);
}

restoreSettings();

window.addEventListener('resize', function () {
    player_container.style.width = window.innerWidth + 'px';
    video_element.style.width = window.innerWidth + 'px';
});

player_container.style.width = window.innerWidth - +'px';
video_element.style.width = window.innerWidth + 'px';