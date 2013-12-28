(function() {

var eventTypes = {
    swipeLeft: function(node, callback, options) {
        var $node = $(node);
        var startPoint;

        $node.on('mousedown', function(evt) {
            startPoint = [ evt.originalEvent.pageX, evt.originalEvent.pageY ];
        });
        $node.on('mouseup', function(evt) {
            var stopPoint = [ evt.originalEvent.pageX, evt.originalEvent.pageY ];
            var info = eventTypes.info(startPoint, stopPoint);
            // if (info.


            if (check(startPoint, stopPoint)) {
                $node.trigger('swipeLeft');
            }
        });


        // $n.on('touchstart', function(evt) {
        //     left = evt.originalEvent.touches[0].pageX;
        // });

        // $n.on('touchmove', function(evt) {
        //     var delta = evt.originalEvent.touches[0].pageX - left;
        //     $n.css('margin-left', defaultLeft + delta);
        // });

    },

    info: function(p1, p2) {
        var dx = p2[0] - p1[0];
        var dy = p2[1] - p1[1];
        var dist = Math.sqrt(dx * dx + dy * dy);
        var a = a(dx / dist, dy / dist);

        return {
            dir: dir(a),
            xdir: norm(dx),
            ydir: norm(dy),
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

        function a(dx, dy) {
            if (dx === 0) {
                return dy > 0 ? 90 : 270;
            }
            if (dy === 0) {
                return dx > 0 ? 0 : 180;
            }
            return Math.round((Math.acos(dx) * 180 / Math.PI) + (dy < 0 ? 180 : 0));
        }

        function dir(a) {
            if (a > (315 + 15) || a < 30) return 'right';
            if (a > (135 + 15) && a < 225 - 15) return 'left';
            if (a > (45 + 15) && a < 135 - 15) return 'top';
            if (a > (225 + 15) && a < 315 - 15) return 'bottom';
            return null;
        }
    },
};

// Export.
window.ttttouch = {
    on: function(node, eventType, callback, options) {
        eventTypes[eventType](node, callback, options);
    },
    __eventTypes: eventTypes // For tests
};




}());


