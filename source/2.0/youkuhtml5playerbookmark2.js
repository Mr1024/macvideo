(function() {
    if (window.isHTML5PlayerBookMarkCodeByZythum) return;
    window.isHTML5PlayerBookMarkCodeByZythum = true;
    var youkuhtml5playerbookmark2 = function() {
        var canPlayM3U8 = !!document.createElement("video").canPlayType("application/x-mpegURL") ? true : false;
        var core = {
            getTop: function(e) {
                var offset = e.offsetTop;
                if (e.offsetParent != null) offset += core.getTop(e.offsetParent);
                return offset
            },
            getLeft: function(e) {
                var offset = e.offsetLeft;
                if (e.offsetParent != null) offset += core.getLeft(e.offsetParent);
                return offset
            },
            byId: function(id) {
                return document.getElementById(id)
            },
            cTag: function(tagName, className, out, html) {
                var t = document.createElement(tagName);
                if (className) {
                    t.className = className
                }
                if (out) {
                    out.appendChild(t)
                }
                if (html) {
                    t.innerHTML = html
                }
                return t
            },
            rNode: function(node) {
                try {
                    node.parentNode.removeChild(node)
                } catch (e) {}
            },
            dClick: function(out) {
                var fnList = {},
                    flag = "d_click",
                    handler = function(el) {
                        if (!el || el == out || !el.getAttribute || !el.tagName) {
                            return
                        }
                        var flag = el.getAttribute("data-click"),
                            i;
                        if (flag && fnList[flag]) {
                            for (i = 0; i < fnList[flag].length; i++) {
                                fnList[flag][i](el)
                            }
                        }
                        handler(el.parentNode)
                    },
                    fn = function(e) {
                        e = e || window.event;
                        handler(e.target || e.srcElement)
                    },
                    add = function(flag, handler) {
                        if (!fnList[flag]) {
                            fnList[flag] = []
                        }
                        fnList[flag].push(handler)
                    };
                out.onclick = fn;
                return {
                    add: add,
                    destroy: function() {
                        out.onclick = null
                    }
                }
            },
            jsonp: function(url, callback, handler) {
                var scr = document.createElement("script");
                var back = handler || "HTML5PlayerBookMarkCodeByZythum" + (new Date).getTime() + Math.random().toString().replace(".", "");
                window[back] = function() {
                    callback && callback.apply(this, arguments);
                    core.rNode(scr);
                    delete window[back]
                };
                document.body.appendChild(scr);
                scr.src = url + back
            }
        };
        var isError = false;
        var MSG_ERROR = "达成契约的过程中好像出现了问题";
        var CSSp = "youkuhtml5playerbookmark2-";
        var cover = core.cTag("div", CSSp + "cover");
        var layer = core.cTag("div", CSSp + "layer");
        var title = core.cTag("div", CSSp + "title", layer, "妈妈再也不用担心我的macbook发烫了计划");
        var player = core.cTag("div", CSSp + "player", layer);
        var video = core.cTag("video", CSSp + "video", player);
        var ctrlbar = core.cTag("div", CSSp + "ctrlbar " + CSSp + "ctrlbarhover", player);
        var ctrlbarb = core.cTag("div", CSSp + "ctrlbarbottom", ctrlbar);
        var progressNum = core.cTag("div", CSSp + "progressNum", ctrlbarb);
        var progress = core.cTag("div", CSSp + "progress", ctrlbarb);
        var volume = core.cTag("div", CSSp + "volume", ctrlbarb);
        var btns = core.cTag("div", CSSp + "btns", ctrlbarb);
        var close = core.cTag("div", CSSp + "close", ctrlbar);
        var center = core.cTag("div", CSSp + "center", ctrlbar, '<div class="' + CSSp + 'center-before"></div><div class="' + CSSp + 'center-after"></div>');
        var range_p = core.cTag("div", CSSp + "range", progress);
        var rangeinner_p = core.cTag("div", CSSp + "rangeinner", range_p);
        var rangebtn_p = core.cTag("div", CSSp + "rangebtn", rangeinner_p);
        var range_v = core.cTag("div", CSSp + "range", volume);
        var rangeinner_v = core.cTag("div", CSSp + "rangeinner", range_v);
        var rangebtn_v = core.cTag("div", CSSp + "rangebtn", rangeinner_v);
        var cmtBtn = core.cTag("div", CSSp + "btn " + CSSp + "cmtBtn", btns);
        var allscreen = core.cTag("div", CSSp + "btn " + CSSp + "allscreen", btns);
        var fullscreen = core.cTag("div", CSSp + "btn " + CSSp + "fullscreen", btns);
        var comment = core.cTag("div", CSSp + "comment");
        var commentFloat = core.cTag("div", CSSp + "commentFloat", comment);
        var commentBottom = core.cTag("div", CSSp + "commentBottom", comment);
        var logArea = core.cTag("div", CSSp + "logArea");
        cmtBtn.style.display = "none";
        close.setAttribute("data-click", "close");
        fullscreen.setAttribute("data-click", "fullscreen");
        allscreen.setAttribute("data-click", "allscreen");
        center.setAttribute("data-click", "center");
        video.setAttribute("autoplay", "true");
        var timer;
        var isAllscreen = false;
        var isBlack = false;
        var destroy = true;
        var currentTime = 0;
        var dclick = core.dClick(layer);
        var click = dclick.add;
        var hdbtns = [];
        var flashElement = undefined;
        var flashElementPlaceHolder = core.cTag("div");
        var job = {
            setUrl: function(obj) {
                job.url = [];
                var i, btn;
                for (i in obj) {
                    btn = core.cTag("div", CSSp + "btn", null, i);
                    btns.insertBefore(btn, btns.children[0]);
                    btn.setAttribute("data-click", "hd");
                    btn.setAttribute("data-url", obj[i]);
                    hdbtns.push(btn);
                    job.url.push(obj[i])
                }
                btn.className = CSSp + "btn " + CSSp + "select";
                video.src = obj[i];
                job.url.pop()
            },
            addUrl: function(obj) {
                var i, btn;
                for (i in obj) {
                    btn = core.cTag("div", CSSp + "btn", null, i);
                    btns.insertBefore(btn, btns.children[0]);
                    btn.setAttribute("data-click", "hd");
                    btn.setAttribute("data-url", obj[i]);
                    hdbtns.push(btn);
                    job.url && job.url.push(obj[i])
                }
            },
            setFlashElement: function(el) {
                try {
                    flashElement = el;
                    el.parentNode.insertBefore(flashElementPlaceHolder, flashElement);
                    el.parentNode.removeChild(flashElement)
                } catch (e) {}
            },
            formatTime: function(time) {
                var hour = parseInt(time / 3600);
                var min = parseInt((time - hour * 3600) / 60);
                var sec = parseInt((time - hour * 3600 - min * 60) / 1);
                return hour + ":" + min + ":" + sec
            },
            showPlayer: function() {
                document.body.appendChild(cover);
                document.body.appendChild(layer);
                document.body.appendChild(logArea);
                destroy = false
            },
            initComment: function() {
                cmtBtn.style.display = "";
                cmtBtn.setAttribute("data-click", "cmt");
                cmtBtn.setAttribute("data-status", "show");
                cmtBtn.className = CSSp + "btn " + CSSp + "select " + CSSp + "cmtBtn";
                click("cmt", function() {
                    if (cmtBtn.getAttribute("data-status") == "show") {
                        job.hideComment();
                        cmtBtn.className = CSSp + "btn " + CSSp + "cmtBtn";
                        cmtBtn.setAttribute("data-status", "hide")
                    } else {
                        job.showComment();
                        cmtBtn.className = CSSp + "btn " + CSSp + "select " + CSSp + "cmtBtn";
                        cmtBtn.setAttribute("data-status", "show")
                    }
                })
            },
            cmt: null,
            commentLoop: function() {},
            hideComment: function() {
                commentBottom.innerHTML = commentFloat.innerHTML = "";
                job.commentLoop = function() {}
            },
            showComment: function(cmt) {
                if (cmt) {
                    job.cmt = cmt = cmt.sort(function(a, b) {
                        return parseFloat(a.p[0]) - parseFloat(b.p[0])
                    })
                } else if (job.cmt) {
                    cmt = job.cmt
                } else {
                    return
                }
                player.appendChild(comment);
                var lastTime = 0;
                var lastInde = 0;
                job.commentLoop = function(nowTime) {
                    if (lastTime === nowTime) {
                        return
                    }
                    if (lastTime > nowTime) {
                        lastTime = nowTime;
                        lastInde = 0
                    }
                    if (lastTime + 1 < nowTime) {
                        lastTime = nowTime - 1;
                        lastInde = 0
                    }
                    var aCmt;
                    var range = [lastTime, nowTime];
                    var i = lastInde;
                    while (aCmt = cmt[i++]) {
                        var cTime = parseFloat(aCmt.p[0]);
                        if (cTime < range[0]) {
                            continue
                        } else if (cTime > range[1]) {
                            break
                        } else {
                            if (aCmt.p[1] <= 3) job.pushCmt(aCmt.msg, aCmt.p);
                            if (aCmt.p[1] == 4 || aCmt.p[1] == 5) job.pushCmtBottom(aCmt.msg, aCmt.p)
                        }
                    }
                    lastTime = nowTime;
                    lastInde = i
                }
            },
            pushCmtBottom: function(msg, p) {
                var showTime = 4;
                var aCmt = core.cTag("div", CSSp + "commentBlockBottom");
                aCmt.appendChild(document.createTextNode(msg));
                if (!commentBottom.children[0]) {
                    commentBottom.appendChild(aCmt)
                } else {
                    commentBottom.insertBefore(aCmt, commentBottom.children[0])
                }
                aCmt.style.cssText += ";color:#" + p[3].toString(16) + ";";
                setTimeout(function() {
                    aCmt.parentNode.removeChild(aCmt)
                }, showTime * 1e3)
            },
            line: [],
            pushCmt: function(msg, p) {
                var showTime = 8;
                var aCmtWidth = 0;
                var aCmtHeight = 0;
                var allWidth = player.offsetWidth;
                var aCmt = core.cTag("div", CSSp + "commentBlock");
                aCmt.appendChild(document.createTextNode(msg));
                commentFloat.appendChild(aCmt);
                aCmtWidth = aCmt.offsetWidth + 10;
                aCmtHeight = 25;
                allWidth = allWidth + aCmtWidth;
                removeTime = showTime / player.offsetWidth * allWidth;
                isShowdTime = showTime / player.offsetWidth * aCmtWidth;
                var lineNum = 0;
                while (job.line[lineNum]) {
                    lineNum++
                }
                job.line[lineNum] = aCmt;
                aCmt.style.cssText += ";-webkit-transform: translate3d(" + allWidth + "px, 0, 0);top:" + lineNum * aCmtHeight + "px;left:0px;color:#" + parseInt(p[3]).toString(16) + ";";
                setTimeout(function() {
                    aCmt.style.cssText += ";-webkit-transform: translate3d(-" + aCmtWidth + "px, 0, 0);-webkit-transition:-webkit-transform " + showTime + "s linear;"
                }, 0);
                setTimeout(function() {
                    job.line[lineNum] = undefined
                }, isShowdTime * 1e3);
                setTimeout(function() {
                    aCmt.parentNode.removeChild(aCmt)
                }, removeTime * 1e3)
            },
            videoLayout: {
                width: 800,
                height: 450
            },
            setVideoLayout: function(width, height) {
                if (isAllscreen || document.webkitIsFullScreen) return;
                var _width = 800;
                var _height = _width / width * height || 450;
                if (_height > window.innerHeight - 80) {
                    _height = window.innerHeight - 80;
                    _width = _height / height * width;
                    _width = _width < 500 ? 500 : _width
                }
                job.videoLayout.height = _height;
                job.videoLayout.width = _width;
                job.fixVideoLayout()
            },
            fixVideoLayout: function() {
                if (isAllscreen || document.webkitIsFullScreen) {
                    layer.style.width = "";
                    layer.style.marginLeft = "";
                    layer.style.height = "";
                    layer.style.marginTop = ""
                } else {
                    layer.style.width = job.videoLayout.width + "px";
                    layer.style.marginLeft = "-" + job.videoLayout.width / 2 + "px";
                    layer.style.height = job.videoLayout.height + "px";
                    layer.style.marginTop = "-" + job.videoLayout.height / 2 + "px"
                }
            },
            log: function(log) {
                window.console && window.console.log(log);
                var l = core.cTag("div", CSSp + "log", logArea, log);
                setTimeout(function() {
                    core.rNode(l)
                }, 1e3)
            }
        };
        var setCurrentTimer;
        click("hd", function(btn) {
            var currentTime = video.currentTime;
            if (btn.className == CSSp + "btn " + CSSp + "select") {
                return
            }
            var i = 0,
                len = hdbtns.length;
            for (; i < len; i++) {
                if (hdbtns[i].className != CSSp + "btn") hdbtns[i].className = CSSp + "btn"
            }
            btn.className = CSSp + "btn " + CSSp + "select";
            video.src = btn.getAttribute("data-url");
            clearTimeout(setCurrentTimer);
            var setCurrentTime = function() {
                try {
                    clearTimeout(setCurrentTimer);
                    video.currentTime = currentTime
                } catch (e) {
                    setCurrentTimer = setTimeout(setCurrentTime, 100)
                }
            };
            setCurrentTime()
        });
        click("fullscreen", function() {
            if (document.webkitIsFullScreen) {
                document.webkitCancelFullScreen()
            } else {
                player.webkitRequestFullScreen()
            }
        });
        click("allscreen", function() {
            if (document.webkitIsFullScreen) return;
            if (!isAllscreen) {
                layer.className = CSSp + "layer " + CSSp + "full";
                allscreen.className = CSSp + "btn " + CSSp + "select " + CSSp + "allscreen";
                isAllscreen = true
            } else {
                layer.className = CSSp + "layer";
                allscreen.className = CSSp + "btn " + CSSp + "allscreen";
                isAllscreen = false
            }
            job.fixVideoLayout()
        });
        click("close", function() {
            if (document.webkitIsFullScreen) {
                document.webkitCancelFullScreen()
            } else {
                core.rNode(layer);
                core.rNode(cover);
                core.rNode(logArea);
                clearTimeout(timer);
                destroy = true;
                video.src = "";
                video.pause();
                try {
                    flashElementPlaceHolder.parentNode.insertBefore(flashElement, flashElementPlaceHolder);
                    flashElementPlaceHolder.parentNode.removeChild(flashElementPlaceHolder)
                } catch (e) {}
                delete window.isHTML5PlayerBookMarkCodeByZythum;
                player.removeEventListener("webkitfullscreenchange", playerWebkitfullscreenchangeHandler, false);
                center.removeEventListener("dblclick", centerDblclickHandler, false);
                document.body.removeEventListener("keydown", docKeydownHandler, false);
                video.removeEventListener("canplay", videoCanplayHandler, false);
                range_p.removeEventListener("mousedown", range_pMousedownHandler, false);
                range_v.removeEventListener("mousedown", range_vMousedownHandler, false);
                document.removeEventListener("mouseup", docMouseupHandler, false);
                document.removeEventListener("mousemove", docMousemoveHandler, false);
                player.removeEventListener("mousemove", playerMousemoveHandler, false);
                dclick.destroy()
            }
        });
        var centerClickCount = 0;
        var centerDblTimer;
        click("center", function() {
            centerClickCount++;
            clearTimeout(centerDblTimer);
            centerDblTimer = setTimeout(function() {
                if (centerClickCount == 1) {
                    if (video.paused) {
                        video.play()
                    } else {
                        video.pause()
                    }
                }
                centerClickCount = 0
            }, 0)
        });
        var coverDblclickHandler = function() {
            if (!isBlack) {
                cover.className = CSSp + "cover " + CSSp + "block";
                isBlack = true
            } else {
                cover.className = CSSp + "cover";
                isBlack = false
            }
        };
        cover.addEventListener("dblclick", coverDblclickHandler, false);
        var centerDblclickHandler = function() {
            if (destroy) return;
            if (document.webkitIsFullScreen) {
                document.webkitCancelFullScreen()
            } else {
                player.webkitRequestFullScreen()
            }
        };
        center.addEventListener("dblclick", centerDblclickHandler, false);
        var docKeydownHandler = function(e) {
            if (destroy) return;
            switch (e.keyCode) {
                case 37:
                    video.currentTime > 20 ? video.currentTime = video.currentTime - 20 : "";
                    e.preventDefault();
                    e.preventDefault();
                    break;
                case 39:
                    video.currentTime < video.duration - 20 ? video.currentTime = video.currentTime + 20 : "";
                    e.preventDefault();
                    e.preventDefault();
                    break;
                case 40:
                    video.volume > .1 ? video.volume = video.volume - .1 : "";
                    e.preventDefault();
                    e.preventDefault();
                    break;
                case 38:
                    video.volume < .9 ? video.volume = video.volume + .1 : "";
                    e.preventDefault();
                    e.preventDefault();
                    break;
                case 32:
                    video[video.paused ? "play" : "pause"]();
                    e.preventDefault();
                    break
            }
        };
        document.body.addEventListener("keydown", docKeydownHandler, false);
        var playerWebkitfullscreenchangeHandler = function() {
            if (destroy) return;
            job.fixVideoLayout();
            if (document.webkitIsFullScreen) {
                layer.className = CSSp + "layer " + CSSp + "full";
                fullscreen.className = CSSp + "btn " + CSSp + "select " + CSSp + "fullscreen";
                allscreen.style.display = "none"
            } else {
                layer.className = isAllscreen ? CSSp + "layer " + CSSp + "full" : CSSp + "layer";
                fullscreen.className = CSSp + "btn " + CSSp + "fullscreen";
                allscreen.style.display = ""
            }
        };
        player.addEventListener("webkitfullscreenchange", playerWebkitfullscreenchangeHandler, false);
        var videoCanplayHandler = function() {
            if (destroy) return;
            video.play();
            job.setVideoLayout(video.videoWidth, video.videoHeight)
        };
        video.addEventListener("canplay", videoCanplayHandler, false);
        var FlagByRange_p = false;
        var FlagByRange_v = false;
        var range_pMousedownHandler = function() {
            if (destroy) return;
            FlagByRange_p = true
        };
        range_p.addEventListener("mousedown", range_pMousedownHandler, false);
        var range_vMousedownHandler = function() {
            if (destroy) return;
            FlagByRange_v = true
        };
        range_v.addEventListener("mousedown", range_vMousedownHandler, false);
        var docMouseupHandler = function(e) {
            if (destroy) return;
            var length = 0;
            var pst = 0;
            if (FlagByRange_p) {
                length = e.clientX - core.getLeft(rangeinner_p);
                pst = length / rangeinner_p.offsetWidth;
                pst = pst > 1 ? 1 : pst;
                pst = pst < 0 ? 0 : pst;
                video.currentTime = video.duration * pst;
                rangebtn_p.style.width = pst * 100 + "%"
            }
            if (FlagByRange_v) {
                length = e.clientX - core.getLeft(rangeinner_v);
                pst = length / rangeinner_v.offsetWidth;
                pst = pst > 1 ? 1 : pst;
                pst = pst < 0 ? 0 : pst;
                video.volume = pst;
                rangebtn_v.style.width = pst * 100 + "%"
            }
            FlagByRange_p = false;
            FlagByRange_v = false
        };
        document.addEventListener("mouseup", docMouseupHandler, false);
        var docMousemoveHandler = function(e) {
            if (destroy) return;
            var length = 0;
            var pst = 0;
            if (FlagByRange_p) {
                length = e.clientX - core.getLeft(rangeinner_p);
                pst = length / rangeinner_p.offsetWidth;
                pst = pst > 1 ? 1 : pst;
                pst = pst < 0 ? 0 : pst;
                video.currentTime = video.duration * pst;
                rangebtn_p.style.width = pst * 100 + "%"
            }
            if (FlagByRange_v) {
                length = e.clientX - core.getLeft(rangeinner_v);
                pst = length / rangeinner_v.offsetWidth;
                pst = pst > 1 ? 1 : pst;
                pst = pst < 0 ? 0 : pst;
                video.volume = pst;
                rangebtn_v.style.width = pst * 100 + "%"
            }
        };
        document.addEventListener("mousemove", docMousemoveHandler, false);
        var ctrlbarIsShow = true;
        var ctrlbarTimer = setTimeout(function() {
            ctrlbar.className = CSSp + "ctrlbar"
        }, 3e3);
        playerMousemoveHandler = function() {
            clearTimeout(ctrlbarTimer);
            if (ctrlbar.className != CSSp + "ctrlbar " + CSSp + "ctrlbarhover") {
                ctrlbar.className = CSSp + "ctrlbar " + CSSp + "ctrlbarhover"
            }
            ctrlbarTimer = setTimeout(function() {
                ctrlbar.className = CSSp + "ctrlbar"
            }, 3e3)
        };
        player.addEventListener("mousemove", playerMousemoveHandler, false);
        var lastTime = -1;
        var num = 0;
        var isLoading = false;
        var loop = function() {
            if (isError) return;
            if (!FlagByRange_p) {
                rangebtn_p.style.width != video.currentTime / video.duration * 100 + "%" && (rangebtn_p.style.width = video.currentTime / video.duration * 100 + "%")
            }
            if (!FlagByRange_v) {
                rangebtn_v.style.width != video.volume * 100 + "%" && (rangebtn_v.style.width = video.volume * 100 + "%")
            }
            progressNum.innerHTML = job.formatTime(video.currentTime) + " / " + job.formatTime(video.duration);
            if (video.duration == 10 && job.url.length) {
                video.src = job.url[0]
            }
            if (video.paused) {
                center.className != CSSp + "center " + CSSp + "pause" && (center.className = CSSp + "center " + CSSp + "pause")
            } else {
                center.className != CSSp + "center" && (center.className = CSSp + "center")
            }
            if (lastTime != video.currentTime || video.ended || video.readyState == 3 || video.readyState == 4 || video.readyState == 5) {
                if (!isLoading) {
                    title.innerHTML = "妈妈再也不用担心我的macbook发烫了计划";
                    isLoading = true
                }
            } else {
                if (isLoading) {
                    title.innerHTML = "勇敢的少年请耐心，少女努力祈祷中...";
                    isLoading = false
                }
                center.className != CSSp + "center " + CSSp + "loading" && (center.className = CSSp + "center " + CSSp + "loading")
            }
            if (job.commentLoop) {
                if (num % 2 == 0) {
                    job.commentLoop(lastTime = video.currentTime)
                }
                if (++num > 10) {
                    num = 0
                }
            }
            timer = setTimeout(loop, 500)
        };
        loop();
        var site = [];
        return {
            add: function(callback) {
                try {
                    callback && site.push(callback(core, canPlayM3U8))
                } catch (e) {}
            },
            init: function() {
                for (var i = 0, len = site.length; i < len; i++) {
                    if (site[i] && site[i].reg && site[i].call) {
                        job.showPlayer();
                        job.log("播放器初始化");
                        try {
                            site[i].call(function(_) {
                                job.setUrl(_.urls);
                                job.log("获取播放源地址");
                                job.setFlashElement(core.byId(_.flashElementId));
                                if (_.comment) {
                                    job.initComment();
                                    job.log("初始化弹幕");
                                    setTimeout(function() {
                                        job.showComment(_.comment);
                                        job.log("生成弹幕")
                                    }, 100)
                                }
                            })
                        } catch (e) {
                            isError = true;
                            title.innerHTML = MSG_ERROR;
                            job.log("播放失败。请把url地址赋值。上微博@zythum_朱一童鞋")
                        }
                        job.log("准备完毕");
                        break
                    }
                }
            }
        }
    }();
    "优酷" && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8) {
        var _id = window.videoId;
        var m3u8 = function(callback) {
            return callback({
                "标清": "/player/getM3U8/vid/" + _id + "/type/flv/ts/" + (((new Date).getTime() / 1e3).toString() | 0) + "/v.m3u8",
                "高清": "/player/getM3U8/vid/" + _id + "/type/mp4/ts/" + (((new Date).getTime() / 1e3).toString() | 0) + "/v.m3u8",
                "超清": "/player/getM3U8/vid/" + _id + "/type/hd2/ts/" + (((new Date).getTime() / 1e3).toString() | 0) + "/v.m3u8"
            })
        };
        var mp4 = function(callback) {
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
            core.jsonp("http://v.youku.com/player/getPlaylist/VideoIDS/" + _id + "/Pf/4?__callback=", function(param) {
                var d = new Date,
                    fileid = getFileID(param.data[0]["streamfileids"]["3gphd"], param.data[0]["seed"]),
                    sid = d.getTime() + "" + (1e3 + d.getMilliseconds()) + "" + parseInt(Math.random() * 9e3),
                    k = param.data[0]["segs"]["3gphd"][0]["k"],
                    st = param.data[0]["segs"]["3gphd"][0]["seconds"];
                core.jsonp("http://f.youku.com/player/getFlvPath/sid/" + sid + "_00/st/mp4/fileid/" + fileid + "?K=" + k + "&hd=1&myp=0&ts=1156&ypp=0&ymovie=1&callback=", function(param) {
                    callback({
                        "高清": param[0]["server"]
                    })
                })
            })
        };
        return {
            reg: /youku\.com/.test(window.location.host) && _id,
            call: function(callback) {
                return (canPlayM3U8 ? m3u8 || mp4 : mp4)(function(urls) {
                    return callback({
                        urls: urls,
                        flashElementId: "movie_player"
                    })
                })
            }
        }
    });
    "土豆" && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8) {
        var _id = window.iid;
        var youkuCode = window.itemData && window.itemData.vcode;
        var m3u8 = function(callback) {
            return !youkuCode ? callback({
                "标清": "http://vr.tudou.com/v2proxy/v2.m3u8?it=" + _id + "&st=2",
                "原画": "http://vr.tudou.com/v2proxy/v2.m3u8?it=" + _id + "&st=5"
            }) : callback({
                "标清": "http://v.youku.com/player/getM3U8/vid/" + youkuCode + "/type/flv/ts/" + (new Date).getTime().toString().substring(0, 10) + "/sc/2/useKeyframe/0/v.m3u8",
                "原画": "http://v.youku.com/player/getM3U8/vid/" + youkuCode + "/type/hd2/ts/" + (new Date).getTime().toString().substring(0, 10) + "/sc/2/useKeyframe/0/v.m3u8"
            })
        };
        var mp4 = function(callback) {
            if (!youkuCode) {
                core.jsonp("http://vr.tudou.com/v2proxy/v2.js?it=" + _id + "&st=52%2C53%2C54&pw=&jsonp=", function(param) {
                    if (param.code == -1) return;
                    for (var urls = {}, i = 0, len = param.urls.length; i < len; i++) {
                        urls[i] = param.urls[i]
                    }
                    return callback(urls)
                })
            } else {
                core.jsonp("https://openapi.youku.com/v2/videos/files.json?client_id=513edb6cf9833ca7&client_secret=eaf151ffdbf1383d934ab4cb91250fa6&type=play&video_id=" + youkuCode + "&_=" + (new Date).getTime().toString() + "&callback=", function(param) {
                    return callback({
                        "标清": param.files["3gphd"].segs[0].url
                    })
                })
            }
        };
        return {
            reg: /tudou\.com/.test(window.location.host) && _id,
            call: function(callback) {
                return (canPlayM3U8 ? m3u8 || mp4 : mp4)(function(urls) {
                    return callback({
                        urls: urls,
                        flashElementId: "playerObject"
                    })
                })
            }
        }
    });
    "腾讯" && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8) {
        var vid = location.search.match(/vid=([0-9a-zA-Z]+)/);
        if (vid) {
            vid = vid[1]
        } else {
            vid = location.href.match(/\/([0-9a-zA-Z]+).html/);
            if (vid) {
                vid = vid[1];
                if (window.COVER_INFO.id == vid) {
                    vid = window.VIDEO_INFO.vid
                }
            }
        }
        if (!vid) return;
        var mp4 = function(callback) {
            core.jsonp("http://vv.video.qq.com/geturl?otype=json&vid=" + vid + "&charge=0&callback=", function(param) {
                callback({
                    "高清": param.vd.vi[0].url
                })
            })
        };
        return {
            reg: /v\.qq\.com/.test(window.location.host) && window.COVER_INFO,
            call: function(callback) {
                return mp4(function(urls) {
                    return callback({
                        urls: urls,
                        flashElementId: "mod_player"
                    })
                })
            }
        }
    });
    "新浪" && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8) {
        var _id;
        try {
            _id = $SCOPE.video.videoData.ipad_vid
        } catch (e) {
            _id = false
        }
        var mp4 = function(callback) {
            callback({
                "高清": "http://edge.v.iask.com.sinastorage.com/" + _id + ".mp4"
            })
        };
        return {
            reg: /video\.sina\.com\.cn/.test(window.location.host) && _id,
            call: function(callback) {
                return mp4(function(urls) {
                    return callback({
                        urls: urls,
                        flashElementId: "myMovie"
                    })
                })
            }
        }
    });
    "搜狐" && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8) {
        var vid = window.vid;
        var nid = window.nid;
        var m3u8 = function(callback) {
            core.jsonp("http://zythum.sinaapp.com/youkuhtml5playerbookmark/sohu.php?vid=" + vid + "&nid=" + nid + "&callback=", function(param) {
                var url = param.urls.m3u8.filter(function(item) {
                    if (item) {
                        return item
                    }
                });
                callback({
                    "高清": url[0]
                })
            })
        };
        var mp4 = function(callback) {
            core.jsonp("http://zythum.sinaapp.com/youkuhtml5playerbookmark/sohu.php?vid=" + vid + "&nid=" + nid + "&callback=", function(param) {
                var url = param.urls.mp4.filter(function(item) {
                    if (item) {
                        return item
                    }
                });
                callback({
                    "高清": url[0]
                })
            })
        };
        return {
            reg: /sohu\.com/.test(window.location.host) && vid,
            call: function(callback) {
                return (canPlayM3U8 ? m3u8 || mp4 : mp4)(function(urls) {
                    return callback({
                        urls: urls,
                        flashElementId: "player"
                    })
                })
            }
        }
    });
    "56" && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8) {
        var page = window._page_;
        var mp4 = function(callback) {
            if (page.channel == "view") {
                var vid = location.href.match(/v\_([0-9a-zA-Z]+)\.html/);
                if (vid) {
                    vid = vid[1];
                    callback({
                        "高清": "http://vxml.56.com/m3u8/" + vid + "/"
                    })
                }
            } else {
                var back = "jsonp_dfInfo";
                var backup = window[back];
                core.jsonp("http://vxml.56.com/ipad/" + (window.oFlv.o.id || window._oFlv_c.id) + "/?src=site&callback=", function(param) {
                    urlList = param.df;
                    var urls = {};
                    for (var i = param.df.length - 1; i >= 0; i--) {
                        urls[param.df[i]["type"]] = param.df[i]["url"]
                    }
                    callback(urls);
                    window[back] = backup
                }, back)
            }
        };
        return {
            reg: /56\.com/.test(window.location.host) && page,
            call: function(callback) {
                return mp4(function(urls) {
                    return callback({
                        urls: urls,
                        flashElementId: "mod_player"
                    })
                })
            }
        }
    });
    "爱奇异" && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8) {
        var init = function(callback) {
            var timer;
            if (window.info) {
                var scr = document.createElement("script");
                scr.src = "http://cache.video.qiyi.com/m/201971/" + window.info.videoId + "/";
                document.body.appendChild(scr);
                timer = setInterval(function() {
                    if (window.ipadUrl) {
                        clearInterval(timer);
                        if (canPlayM3U8) {
                            callback({
                                "高清": ipadUrl.data.url
                            })
                        } else {
                            var mp4Url = ipadUrl.data.mp4Url;
                            var scr = document.createElement("script");
                            scr.src = mp4Url;
                            document.body.appendChild(scr);
                            clearInterval(timer);
                            timer = setInterval(function() {
                                if (window.videoUrl) {
                                    clearInterval(timer);
                                    callback({
                                        "高清": videoUrl.data.l
                                    })
                                }
                            }, 100)
                        }
                    }
                }, 100)
            } else {
                var box = document.getElementById("flashbox");
                var tvid = box.getAttribute("data-player-tvid");
                core.jsonp("http://zythum.sinaapp.com/youkuhtml5playerbookmark/iqiyi.php?tvid=" + tvid + "&callback=", function(data) {
                    if (canPlayM3U8) {
                        callback({
                            "高清": data.data.mpl[0].m3u
                        })
                    } else {
                        var mp4Url = data.data.mpl[0].m4u;
                        var scr = document.createElement("script");
                        scr.src = mp4Url;
                        document.body.appendChild(scr);
                        clearInterval(timer);
                        timer = setInterval(function() {
                            if (window.videoUrl) {
                                clearInterval(timer);
                                callback({
                                    "高清": videoUrl.data.l
                                })
                            }
                        }, 100)
                    }
                })
            }
        };
        return {
            reg: /iqiyi\.com/.test(window.location.host),
            call: function(callback) {
                return init(function(urls) {
                    return callback({
                        urls: urls,
                        flashElementId: "flash"
                    })
                })
            }
        }
    });
    "乐视" && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8) {
        canPlayM3U8 = false;
        var getScript = function() {
            var s = document.getElementsByTagName("script");
            for (var i = 0, len = s.length; i < len; i++) {
                if (/LELib\.Revive\.Player/.test(s[i].innerHTML)) {
                    return s[i]
                }
            }
            return false
        };
        var init = function(callback) {
            var script = getScript();
            if (!script) return;
            var temp = LELib.Revive.Player;
            var isfirst = true;
            var value;
            LELib.Revive.Player = function() {
                value = arguments[2]
            };
            eval(script.innerHTML);
            LELib.Revive.Player = temp;
            var urls = {};
            if (canPlayM3U8) {
                if (value.v[0]) urls["标清"] = LETV.Base64.decode(value.v[0]);
                if (value.v[1]) urls["高清"] = LETV.Base64.decode(value.v[1])
            } else {
                if (value.v[0]) urls["标清"] = LETV.Base64.decode(value.v[0]).replace("tss=ios", "");
                if (value.v[1]) urls["高清"] = LETV.Base64.decode(value.v[1]).replace("tss=ios", "")
            }
            if (urls) {
                callback(urls)
            }
        };
        return {
            reg: /letv\.com/.test(window.location.host),
            call: function(callback) {
                return init(function(urls) {
                    return callback({
                        urls: urls,
                        flashElementId: "fla_box"
                    })
                })
            }
        }
    });
    "acfun" && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8) {
        var sina = function(vid, callback, commentInfo) {
            callback({
                sina: "http://edge.v.iask.com.sinastorage.com/" + vid + ".mp4"
            }, commentInfo)
        };
        var youku = function(vid, callback, commentInfo) {
            if (false && canPlayM3U8) {
                callback({
                    "标清": "http://v.youku.com/player/getM3U8/vid/" + vid + "/type/flv/ts/" + (new Date).getTime().toString().substring(0, 10) + "/sc/2/useKeyframe/0/v.m3u8",
                    "原画": "http://v.youku.com/player/getM3U8/vid/" + vid + "/type/hd2/ts/" + (new Date).getTime().toString().substring(0, 10) + "/sc/2/useKeyframe/0/v.m3u8"
                }, commentInfo)
            } else {
                core.jsonp("http://zythum.sinaapp.com/youkuhtml5playerbookmark/getyoukuid.php?id=" + vid + "&callback=", function(param) {
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
                    var d = new Date,
                        fileid = getFileID(param.data[0]["streamfileids"]["3gphd"], param.data[0]["seed"]),
                        sid = d.getTime() + "" + (1e3 + d.getMilliseconds()) + "" + parseInt(Math.random() * 9e3),
                        k = param.data[0]["segs"]["3gphd"][0]["k"],
                        st = param.data[0]["segs"]["3gphd"][0]["seconds"];
                    core.jsonp("http://f.youku.com/player/getFlvPath/sid/" + sid + "_00/st/mp4/fileid/" + fileid + "?K=" + k + "&hd=1&myp=0&ts=1156&ypp=0&ymovie=1&callback=", function(param) {
                        callback({
                            "高清": param[0]["server"]
                        }, commentInfo)
                    })
                })
            }
        };
        var qq = function(vid, callback, commentInfo) {
            core.jsonp("http://vv.video.qq.com/geturl?otype=json&vid=" + vid + "&charge=0&callback=", function(param) {
                callback({
                    "高清": param.vd.vi[0].url
                }, commentInfo)
            })
        };
        var tudou = function(vid, callback, commentInfo) {
            if (canPlayM3U8) {
                callback({
                    "标清": "http://vr.tudou.com/v2proxy/v2.m3u8?it=" + vid + "&st=2",
                    "原画": "http://vr.tudou.com/v2proxy/v2.m3u8?it=" + vid + "&st=5"
                }, commentInfo)
            } else {
                core.jsonp("http://vr.tudou.com/v2proxy/v2.js?it=" + vid + "&st=52%2C53%2C54&pw=&jsonp=", function(param) {
                    if (param.code == -1) return;
                    for (var urls = {}, i = 0, len = param.urls.length; i < len; i++) {
                        urls[i] = param.urls[i]
                    }
                    return callback(urls, commentInfo)
                })
            }
        };
        var init = function(callback) {
            var aid = location.href.match(/\/(ac[0-9a-zA-Z\_]+)/)[1];
            core.jsonp("http://zythum.sinaapp.com/youkuhtml5playerbookmark/acfun.php?aid=" + aid + "&callback=", function(vid, videoInfo, commentInfo) {
                videoInfo.toLowerCase() == "sina" ? sina(vid, callback, commentInfo) : videoInfo.toLowerCase() == "youku" ? youku(vid, callback, commentInfo) : videoInfo.toLowerCase() == "qq" ? qq(vid, callback, commentInfo) : videoInfo.toLowerCase() == "tudou" ? tudou(vid, callback, commentInfo) : "false"
            })
        };
        return {
            reg: /acfun\.tv/.test(window.location.host) && window.system,
            call: function(callback) {
                return init(function(urls, commentInfo) {
                    return callback({
                        urls: urls,
                        flashElementId: "area-player",
                        comment: commentInfo
                    })
                })
            }
        }
    });
    "bilibili" && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8) {
        var aid = window.aid,
            pageno = window.pageno;
        var sina = function(src, callback, commentInfo) {
            var id = src.match(/vid\=([0-9a-zA-Z]+)/);
            if (id) {
                id = id[1];
                src = "http://edge.v.iask.com.sinastorage.com/" + id + ".mp4"
            }
            callback({
                sina: src
            }, commentInfo)
        };
        var youku = function(src, callback, commentInfo) {
            var id = src.match(/vid\/([0-9a-zA-Z]+)\//);
            id = id[1];
            if (false && canPlayM3U8) {
                callback({
                    "标清": "http://v.youku.com/player/getM3U8/vid/" + id + "/type/flv/ts/" + (new Date).getTime().toString().substring(0, 10) + "/sc/2/useKeyframe/0/v.m3u8",
                    "原画": "http://v.youku.com/player/getM3U8/vid/" + id + "/type/hd2/ts/" + (new Date).getTime().toString().substring(0, 10) + "/sc/2/useKeyframe/0/v.m3u8"
                }, commentInfo)
            } else {
                core.jsonp("http://zythum.sinaapp.com/youkuhtml5playerbookmark/getyoukuid.php?id=" + id + "&callback=", function(param) {
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
                    var d = new Date,
                        fileid = getFileID(param.data[0]["streamfileids"]["3gphd"], param.data[0]["seed"]),
                        sid = d.getTime() + "" + (1e3 + d.getMilliseconds()) + "" + parseInt(Math.random() * 9e3),
                        k = param.data[0]["segs"]["3gphd"][0]["k"],
                        st = param.data[0]["segs"]["3gphd"][0]["seconds"];
                    core.jsonp("http://f.youku.com/player/getFlvPath/sid/" + sid + "_00/st/mp4/fileid/" + fileid + "?K=" + k + "&hd=1&myp=0&ts=1156&ypp=0&ymovie=1&callback=", function(param) {
                        callback({
                            "高清": param[0]["server"]
                        }, commentInfo)
                    })
                })
            }
        };
        var qq = function(src, callback, commentInfo) {
            var id = src.match(/qq\.com\/([0-9a-zA-Z]+)\.mp4/);
            if (id) {
                id = id[1];
                core.jsonp("http://vv.video.qq.com/geturl?otype=json&vid=" + id + "&charge=0&callback=", function(param) {
                    callback({
                        "高清": param.vd.vi[0].url
                    }, commentInfo)
                })
            }
        };
        var bili = function(src, callback, commentInfo) {
            callback({
                bili: src
            }, commentInfo)
        };
        var init = function(callback) {
            core.jsonp("http://zythum.sinaapp.com/youkuhtml5playerbookmark/bilibili.php?aid=" + aid + "&page=" + pageno + "&callback=", function(cid, videoInfo, commentInfo) {
                var src = videoInfo.durl[0]["url"];
                src.indexOf("v.iask.com") >= 0 ? sina(src, callback, commentInfo) : src.indexOf("v.youku.com") >= 0 ? youku(src, callback, commentInfo) : src.indexOf("qq.com") >= 0 ? qq(src, callback, commentInfo) : bili(src, callback, commentInfo)
            })
        };
        return {
            reg: /bilibili\.tv/.test(window.location.host) && window.aid,
            call: function(callback) {
                return init(function(urls, commentInfo) {
                    return callback({
                        urls: urls,
                        flashElementId: "bofqi",
                        comment: commentInfo
                    })
                })
            }
        }
    });
    "迅雷播放特权" && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8) {
        var getCookie = function(key) {
            var cookies = document.cookie.split("; "),
                i = 0,
                l = cookies.length,
                temp, value;
            for (; i < l; i++) {
                temp = cookies[i].split("=");
                if (temp[0] === key) {
                    return decodeURIComponent(temp[1])
                }
            }
            return null
        };
        var m3u8 = function(callback) {
            var href = encodeURI(window.location.href);
            var url = decodeURI(href.match(/&url=([0-9a-zA-Z\%\-\_\.]+)/)[1]);
            var filename = href.match(/&filename=([0-9a-zA-Z\%\-\_\.]+)/);
            if (!filename) {
                filename = href.match(/&folder=([0-9a-zA-Z\%\-\_\.]+)/)
            }
            var video_name = decodeURI(filename[1]);
            core.jsonp("http://i.vod.xunlei.com/req_get_method_vod?url=" + url + "&video_name=" + video_name + "&platform=1&userid=" + getCookie("userid") + "&vip=1&sessionid=" + getCookie("sessionid") + "&cache=" + (new Date).getTime().toString() + "&from=vlist&jsonp=", function(param) {
                var urls = {};
                var format = ["标清", "高清", "超清"];
                var list = param.resp.vodinfo_list;
                for (var i = 0, len = list.length; i < len; i++) {
                    urls[format[i]] = list[i].vod_url
                }
                callback(urls)
            })
        };
        return {
            reg: /iplay\.html/.test(window.location.pathname) && window.gCloudVod && canPlayM3U8,
            call: function(callback) {
                return m3u8(function(urls) {
                    return callback({
                        urls: urls,
                        flashElementId: "XL_CLOUD_VOD_PLAYER"
                    })
                })
            }
        }
    });
    "网易公开课" && youkuhtml5playerbookmark2.add(function(core, canPlayM3U8) {
        var m3u8 = function(callback) {
            callback({
                "高清": window.openCourse.getCurrentMovie().appsrc
            })
        };
        return {
            reg: /v\.163\.com/.test(window.location.host) && window.openCourse && canPlayM3U8,
            call: function(callback) {
                return m3u8(function(urls) {
                    return callback({
                        urls: urls,
                        flashElementId: "FPlayer"
                    })
                })
            }
        }
    });
    youkuhtml5playerbookmark2.init()
})()
