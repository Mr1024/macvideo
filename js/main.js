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
        each: function(obj, callback) {
            var value,
                i = 0,
                length = obj.length;
            if (Object.prototype.toString.call(obj) === '[object Array]') {
                for (; i < length; i++) {
                    value = callback.call(obj[i], i, obj[i]);
                    if (value === false) {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    value = callback.call(obj[i], i, obj[i]);
                    if (value === false) {
                        break;
                    }
                }
            }
            return obj;
        },
        serialize: function(query) {
            var arr = [];
            this.each(query, function(value, key) {
                    value !== undefined && arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(value);
                    });
                return arr.join("&")
            }
        },
        jsonp: function(url, data, callback, handler) {
            var script = document.createElement("script");
            var cache = handler || "mavvideo" + +(new Date) + Math.random().toString().replace(".", "");
            var hasQuery = url.indexOf("?") >= 0;
            if (Object.prototype.toString.call(data) === '[object Function]') {
                handler = handler || callback;
                callback = data;
                data = undefined;
            };
            param = this.serialize(param);
            if (param.length) param = (hasQuery ? "&" : "?") + param;
            handler = [hasQuery || param.length ? "&" : "?", handler || "callback", "=", back].join("");
            window[cache] = function() {
                callback && callback.apply(this, arguments);
                try {
                    script.parentNode.removeChild(script);
                } catch (e) {}
                delete window[cache];
            };
            document.body.appendChild(script);
            script.src = url + param + handler;
        },
        initvideo: function(target, urlObj) {
            target.src = '/player/getM3U8/vid/215770447/type/hd2/ts/1420357160/v.m3u8';
        }
    };
    macvideo.on('v.youku.com', function() {
        var videoId = window.videoId;
        var mk_a3 = "b4et";
        var mk_a4 = "boa4";
        var userCache_a1 = "4";
        var userCache_a2 = "1";
        var rs;
        var sid;
        var token;
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
