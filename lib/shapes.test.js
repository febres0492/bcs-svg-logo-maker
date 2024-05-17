// testing the shapes module
import { Circle, Triangle, Square } from './shapes.js' 

describe('shapes', () => {
    
    it('should return Circle shape from the SVG string', () => {
        const shape = new Circle();
        shape.setColor("blue")
        expect(shape.render()).toEqual(`<circle cx="150" cy="100" r="100" fill="blue" />`)
    })

    it('should return Square shape from the SVG string', () => {
        const shape = new Square();
        shape.setColor("blue")
        expect(shape.render()).toEqual(`<rect width="300" height="200" fill="blue"/>`)
    })

    it('should return Triangle shape from the SVG string', () => {
        const shape = new Triangle();
        shape.setColor("blue")
        expect(shape.render()).toEqual('<polygon points="150, 18 244, 182 56, 182" fill="blue" />');
    })
})