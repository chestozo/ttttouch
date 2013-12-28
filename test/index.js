var eventTypes = ttttouch.__eventTypes;
var infoTest = function(p1, p2, info) {
    return function() {
        expect(eventTypes.info(p1, p2)).to.eql(info);
    };
};

describe('Touch', function() {
    describe('2 points info', function() {
        it('0deg',  infoTest([0, 0], [1, 0], { dir: 'right', xdir: 1, ydir: 0, angle: 0, dist: 1 }));
        it('45deg', infoTest([0, 0], [1, 1], { dir: null, xdir: 1, ydir: 1, angle: 45, dist: Math.sqrt(2) }));
        it('90deg', infoTest([0, 0], [0, 1], { dir: 'top', xdir: 0, ydir: 1, angle: 90, dist: 1 }));
        it('135deg', infoTest([0, 0], [-1, 1], { dir: null, xdir: -1, ydir: 1, angle: 135, dist: Math.sqrt(2) }));
        it('180deg', infoTest([0, 0], [-1, 0], { dir: 'left', xdir: -1, ydir: 0, angle: 180, dist: 1 }));
        it('225deg', infoTest([0, 0], [-1, -1], { dir: null, xdir: -1, ydir: -1, angle: 225, dist: Math.sqrt(2) }));
        it('270deg');
        it('315deg');
    });

    describe('dir: edge cases', function() {});
});
