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
            var reg = convertPatternToReg(reg);
            if (reg.test(window.location.host)) {
                callback.call(this);
            }
        }
    };
    macvideo.on('v.youku.com', function() {
        var videoId = window.videoId;
        if (!!videoId) {

        }
    });
})(window);
