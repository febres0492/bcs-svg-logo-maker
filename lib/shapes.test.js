// testing the shapes module
import { Circle, Triangle, Rectangle } from './shapes.js' 

describe('shapes', () => {
    it('should return the area of a circle', () => {
        const circle = new Circle(5)
        expect(circle.area()).toBeCloseTo(78.54)
    })

    it('should return the area of a rectangle', () => {
        const rectangle = new Rectangle(5, 4)
        expect(rectangle.area()).toBe(20)
    })

    it('should return the area of a triangle', () => {
        const triangle = new Triangle(5, 4)
        expect(triangle.area()).toBe(10)
    })
})

// expect(shape.render()).toEqual('<polygon points="150, 18 244, 182 56, 182" fill="blue" />');
