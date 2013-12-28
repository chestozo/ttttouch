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

        return {
            xdir: norm(dx),
            ydir: norm(dy),
            dist: Math.sqrt(dx * dx + dy * dy)
        };

        function norm(val) {
            if (val > 0) {
                return 1;
            } else if (val < 0) {
                return -1;
            }
            return 0;
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


