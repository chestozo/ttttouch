var init = function() {
    $(document)
        .on('swipeTop', '#inner', function(evt) {
            $(evt.currentTarget).css('background-color', '#DDD');
            evt.stopPropagation();
        })
        .on('swipeLeft', '#card', function(evt) {
            $(evt.currentTarget).css('background-color', 'red');
        })
        .on('swipeRight', '#card', function(evt) {
            $(evt.currentTarget).css('background-color', 'green');
        })
        .on('swipeTop', '#card', function(evt) {
            $(evt.currentTarget).css('background-color', 'white');
        })
        .on('swipeBottom', '#card', function(evt) {
            $(evt.currentTarget).css('background-color', 'yellow');
        })
        .on('swipeBottom', '#inner', function(evt) {
            $(evt.currentTarget).css('background-color', '#333');
            evt.stopPropagation();
        });
};

$(init);
