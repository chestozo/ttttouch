var eventTypes = ttttouch.__eventTypes;
var infoTest = function(p1, p2, info) {
    return function() {
        expect(eventTypes.info(p1, p2)).to.be(info);
    };
};

describe('Touch', function() {
    describe('2 points info', function() {
        it('0deg',  infoTest([0, 0], [1, 0], { dir: 'rigth', xdir: 1, ydir: 0, angle: 0, dist: 1 }));
        it('45deg', infoTest([0, 0], [1, 1], { xdir: 1, ydir: 1, angle: 45, dist: Math.sqrt(2) }));
        it('90deg');
        it('135deg');
        it('180deg');
        it('225deg');
        it('270deg');
        it('315deg');
    });

    describe('dir: edge cases', function() {});
});
