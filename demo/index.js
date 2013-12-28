var init = function() {
    var $node = $('#card');
    var node = $node[0];

    var left;
    var defaultLeft = parseInt($node.css('margin-left'), 10);

    // ttttouch.on(node, 'singleTap', function() {
    //     $node.css('background-color', '#EEE');
    // });

    ttttouch.on(node, 'swipeLeft', function() {
        $node.css('background-color', 'red');
    });

    ttttouch.on(node, 'swipeRight', function() {
        $node.css('background-color', 'green');
    });

    ttttouch.on(node, 'swipeTop', function() {
        $node.css('background-color', 'white');
    });

    ttttouch.on(node, 'swipeBottom', function() {
        $node.css('background-color', 'yellow');
    });




    // $node.on('touchstart', function(evt) {
    //     left = evt.originalEvent.touches[0].pageX;
    // });

    // $node.on('touchmove', function(evt) {
    //     var delta = evt.originalEvent.touches[0].pageX - left;
    //     $node.css('margin-left', defaultLeft + delta);
    // });

    // $node.on('touchend', function() {
    //     $node.css('margin-left', defaultLeft);
    // });





    // addHandler('touchstart', function(e){
    //                                 lastY = e.originalEvent.touches[0].pageY;
    //                             });

    //                             addHandler('touchmove', function(e) {
    //                                 swipe = e.originalEvent.touches[0].pageY + lastY;
    //                                 st = $(this).scrollTop();

    //                                 if(swipe < settings.swipeDistance) {
    //                                   e.preventDefault();
    //                                 }

    //                                 if(swipe > settings.swipeDistance && lastY <= 40) {
    //                                     methods.onSwipe($this, settings);
    //                                 }
    //                             });

    //                             addHandler('touchend', function(){
    //                                 swipe = 0;
    //                             });


};

$(init);
