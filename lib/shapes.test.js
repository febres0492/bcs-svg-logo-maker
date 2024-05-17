// testing the shapes module
import { Circle, Triangle, Square } from './shapes.js' 

describe('shapes', () => {
    const obj = {
        text: 'SVG',
        stack_letters: 'no',
        text_color: '#00000080',
        shape_color: 'lightblue',
    };
    
    it('should return Circle shape from the SVG string', () => {
        const shape = new Circle( obj )
        shape.setColor("blue")
        console.log(shape.render())
        expect(shape.render()).toEqual(`<circle cx="150" cy="100" r="100" fill="blue" />`)
    })

    it('should return Square shape from the SVG string', () => {
        const shape = new Square( obj )
        shape.setColor("blue")
        console.log(shape.render())
        expect(shape.render()).toEqual(`<rect width="300" height="200" fill="blue"/>`)
    })

    it('should return Triangle shape from the SVG string', () => {
        const shape = new Triangle( obj )
        shape.setColor("blue")
        console.log(shape.render())
        expect(shape.render()).toEqual(`<polygon points="150,0 300,200 0,200" fill="blue"/>`)
    })
})