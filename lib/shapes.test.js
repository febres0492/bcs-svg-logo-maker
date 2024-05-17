// testing the shapes module
import { Circle, Triangle, Square } from './shapes.js' 

describe('shapes', () => {
    const obj = {
        text: 'SVG',
        stack_letters: 'no',
        text_color: '#00000080',
        shape_color: 'lightblue'
      }
    it('should return an SVG string with a Circle shape in it', () => {
        const circle = new Circle( obj )
        expect(circle.render()).toMatch("<circle cx")
    })

    it('should return an SVG string with a Rectangle shape in it', () => {
        const rectangle = new Square( obj )
        expect(rectangle.render()).toMatch("<rect width")
    })

    it('should return an SVG string with a Triangle shape in it', () => {
        const triangle = new Triangle( obj )
        expect(triangle.render()).toMatch("<polygon points")
    })
})