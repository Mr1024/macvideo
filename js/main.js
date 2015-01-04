(function(window) {
    var macvideo = {
        canPlayM3U8: (!!document.createElement("video").canPlayType("application/x-mpegURL")),
        convertPatternToReg: function(pattern) {
            var regexCharacters = '\\[](){}^$-.*+?|,/';
            if (typeof pattern === 'string') {
                regexCharacters.split('').forEach(function(character) {
                    var characterAsRegex = new RegExp('(\\' + character + ')', 'g');
                    pattern = pattern.replace(characterAsRegex, '\\$1');
                });
                pattern = new RegExp(pattern, 'g');
            }
            return pattern;
        },
        on: function(reg, callback) {
            var reg = this.convertPatternToReg(reg);
            if (reg.test(window.location.host)) {
                callback.call(this);
            }
        },
        jsonp: function(url, callback, handler) {
            var script = document.createElement("script");
            var cache = handler || "mavvideo" + (new Date).getTime() + Math.random().toString().replace(".", "");
            window[cache] = function() {
                callback && callback.apply(this, arguments);
                try {
                    script.parentNode.removeChild(script);
                } catch (e) {}
                delete window[cache];
            };
            document.body.appendChild(script);
            script.src = url + cache
        },
        initvideo: function(target, urlObj) {
            target.src = urlobj[0];
        }
    };
    macvideo.on('v.youku.com', function() {
        var videoId = window.videoId;
        var urlObj = {};
        if (!!videoId) {
            var videoObj = document.getElementById("movie_player");
            console.log(videoObj);
            if (!macvideo.canPlayM3U8) {
                urlObj = {
                    "标清": "/player/getM3U8/vid/" + videoId + "/type/flv/ts/" + (((new Date).getTime() / 1e3).toString() | 0) + "/v.m3u8",
                    "高清": "/player/getM3U8/vid/" + videoId + "/type/mp4/ts/" + (((new Date).getTime() / 1e3).toString() | 0) + "/v.m3u8",
                    "超清": "/player/getM3U8/vid/" + videoId + "/type/hd2/ts/" + (((new Date).getTime() / 1e3).toString() | 0) + "/v.m3u8"
                };
                macvideo.initvideo(videoObj, urlObj);
            } else {
                function getFileIDMixString(seed) {
                    var source = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/\\:._-1234567890".split(""),
                        mixed = [],
                        index;
                    for (var i = 0, len = source.length; i < len; i++) {
                        seed = (seed * 211 + 30031) % 65536;
                        index = Math.floor(seed / 65536 * source.length);
                        mixed.push(source[index]);
                        source.splice(index, 1)
                    }
                    return mixed.join("")
                }

                function getFileID(fileid, seed) {
                    var mixed = getFileIDMixString(seed),
                        ids = fileid.split("*"),
                        realId = [],
                        idx;
                    for (var i = 0; i < ids.length; i++) {
                        idx = parseInt(ids[i], 10);
                        realId.push(mixed.charAt(idx))
                    }
                    return realId.join("")
                }
                macvideo.jsonp("http://v.youku.com/player/getPlaylist/VideoIDS/" + videoId + "/Pf/4?__callback=", function(param) {
                    var d = new Date,
                        fileid = getFileID(param.data[0]["streamfileids"]["3gphd"], param.data[0]["seed"]),
                        sid = d.getTime() + "" + (1e3 + d.getMilliseconds()) + "" + parseInt(Math.random() * 9e3),
                        k = param.data[0]["segs"]["3gphd"][0]["k"],
                        st = param.data[0]["segs"]["3gphd"][0]["seconds"];
                    macvideo.jsonp("http://f.youku.com/player/getFlvPath/sid/" + sid + "_00/st/mp4/fileid/" + fileid + "?K=" + k + "&hd=1&myp=0&ts=1156&ypp=0&ymovie=1&callback=", function(param) {
                        urlobj = {
                            "高清": param[0]["server"]
                        }
                        //macvideo.initvideo(videoObj, urlObj);
                    })
                })
            }
        }
    });
})(window);
