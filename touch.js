(function() {

var is_touch = 'ontouchstart' in window;

var evtType = function(type) {
    switch(type) {
        case 'touchstart':
            return is_touch ? 'touchstart' : 'mousedown';
        case 'touchmove':
            return is_touch ? 'touchmove' : 'mousemove';
        case 'touchend':
            return is_touch ? 'touchend' : 'mouseup';
    }
};

var extractPoint = function(evt) {
    var origEvent = evt.originalEvent;
    return origEvent.touches ? [ origEvent.touches[0].pageX, origEvent.touches[0].pageY ] : [ origEvent.pageX, origEvent.pageY ];
};

var getInfo = function(p1, p2) {
    function norm(val) {
        if (val > 0) {
            return 1;
        } else if (val < 0) {
            return -1;
        }
        return 0;
    }

    // 0 .. 359
    function angle(dx, dy) {
        if (dx === 0) {
            return dy > 0 ? 270 : 90;
        }
        if (dy === 0) {
            return dx > 0 ? 0 : 180;
        }
        var a = Math.round(Math.acos(dx) * 180 / Math.PI);

        if (dy > 0) {
            a = 360 - a;
        }
        return a;
    }

    function dir(a) {
        if (a > (315 + 15) || a < 30) { return 'right'; }
        if (a > (135 + 15) && a < 225 - 15) { return 'left'; }
        if (a > (45 + 15) && a < 135 - 15) { return 'top'; }
        if (a > (225 + 15) && a < 315 - 15) { return 'bottom'; }
        return null;
    }

    var dx = p2[0] - p1[0];
    var dy = p2[1] - p1[1];
    var dist = Math.sqrt(dx * dx + dy * dy);
    var a = angle(dx / dist, dy / dist);

    return {
        dir: dir(a),
        xdir: norm(dx),
        ydir: -norm(dy),
        angle: a,
        dist: dist
    };
};

var capitalizeFirst = function(str) {
    return (str && str.length) ? (str.substring(0, 1).toUpperCase() + str.substring(1)) : str;
};

var swipeMinLength = 40;

var getGesture = function(p1, p2) {
    var info = getInfo(p1, p2);
    if (info.dir && info.dist >= swipeMinLength) {
        return {
            type: 'swipe' + capitalizeFirst(info.dir),
            info: info
        };
    }
};

// ----------------------------------------------------------------------------------------------------------------- //

var touchStartPoint = null;
var touchStartNode = null;

// Bind once trigger many times.
$(document)
    .on(evtType('touchstart'), function(evt) {
        // NOTE: Do not react on multigesture now.
        if (evt.originalEvent.touches && evt.originalEvent.touches.length > 1) {
            return;
        }

        touchStartPoint = extractPoint(evt);
        touchStartNode = evt.target;
    })
    .on([evtType('touchmove'), evtType('touchend')].join(' '), function(evt) {
        if (!touchStartPoint) {
            return;
        }

        var gesture = getGesture(touchStartPoint, extractPoint(evt));
        if (gesture) {
            $(touchStartNode).trigger(gesture.type, [ evt, gesture.info ]);

            touchStartPoint = null;
            touchStartNode = null;
        }
    });

// Export.
window.ttttouch = {

    // For tests.
    __test: {
        getInfo: getInfo
    }
};

}());
