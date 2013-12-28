var init = function() {
    var $node = $('#card');
    var node = $node[0];

    var left;
    var defaultLeft = parseInt($node.css('margin-left'), 10);

    // ttttouch.on(node, 'singleTap', function() {
    //     $node.css('background-color', '#EEE');
    // });

    ttttouch.on('#card', 'swipeLeft', function() {
        $node.css('background-color', 'red');
    });

    ttttouch.on('#card', 'swipeRight', function() {
        $node.css('background-color', 'green');
    });

    ttttouch.on('#card', 'swipeTop', function() {
        $node.css('background-color', 'white');
    });

    ttttouch.on('#card', 'swipeBottom', function() {
        $node.css('background-color', 'yellow');
    });
};

$(init);
