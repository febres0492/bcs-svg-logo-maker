// testing the shapes module
const shapes = require('./shapes');

describe('shapes', () => {
    it('should return the area of a circle', () => {
        expect(shapes.circle(5)).toBeCloseTo(78.54);
    });
    
    it('should return the area of a rectangle', () => {
        expect(shapes.rectangle(5, 4)).toBe(20);
    });
});