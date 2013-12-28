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
    var dx = p2[0] - p1[0];
    var dy = p2[1] - p1[1];
    var dist = Math.sqrt(dx * dx + dy * dy);
    var a = a(dx / dist, dy / dist);

    return {
        dir: dir(a),
        xdir: norm(dx),
        ydir: -norm(dy),
        angle: a,
        dist: dist
    };

    function norm(val) {
        if (val > 0) {
            return 1;
        } else if (val < 0) {
            return -1;
        }
        return 0;
    }

    // 0 .. 359
    function a(dx, dy) {
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
        if (a > (315 + 15) || a < 30) return 'right';
        if (a > (135 + 15) && a < 225 - 15) return 'left';
        if (a > (45 + 15) && a < 135 - 15) return 'top';
        if (a > (225 + 15) && a < 315 - 15) return 'bottom';
        return null;
    }
};

var swipe = function(dir) {
    return function(node, callback, options) {
        var startPoint;
        var selector = undefined;

        options = $.extend({ min: 3 }, options);

        if (typeof node === 'string') {
            selector = node;
            node = document;
        }

        var $node = $(node);

        $node.on(evtType('touchstart'), function(evt) {
            startPoint = extractPoint(evt);
            var touchMoveEventName = evtType('touchmove') + '.ttttouch';
            var touchEndEventName = evtType('touchend') + '.ttttouch';

            if (evt.originalEvent.touches && evt.originalEvent.touches.length > 1) {
                // Do not react on multigesture.
                return;
            }

            $node.on(touchMoveEventName, selector, function(evt) {
                var stopPoint = extractPoint(evt);
                var info = getInfo(startPoint, stopPoint);
                if (info.dir === dir && info.dist >= options.min) {
                    callback(evt, info);
                    $node.off('.ttttouch');
                }
            });

            $node.on(touchEndEventName, selector, function(evt) {
                $node.off('.ttttouch');
            });
        });
    };
};

var eventTypes = {
    swipeLeft: swipe('left'),
    swipeRight: swipe('right'),
    swipeTop: swipe('top'),
    swipeBottom: swipe('bottom')
};

// Export.
window.ttttouch = {
    on: function(node, eventType, callback, options) {
        eventTypes[eventType](node, callback, options);
    },

    // For tests.
    __test: {
        getInfo: getInfo
    }
};

}());
