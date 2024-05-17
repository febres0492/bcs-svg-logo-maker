import { replacingPlaceHolders } from './utils.js'

class Shape {
    constructor(obj) {
        if(!obj){throw new Error('Shape constructor requirers obj input, obj = ', obj)}
        obj.width = obj.width || 300
        obj.height = obj.height || 200
        obj.font_size = obj.width * .9
        obj.cx = obj.width /2
        obj.cy = obj.height /2
        obj.tx = obj.width /2
        obj.ty = obj.height /2
        this.values = obj
        
        // the | are just to add the proper formatting and spaces when saving string to the file
        this.textTemplate = `
        |    <text x="[tx]" y="[ty]" 
        |        style="font-family:Arial; font-size:[font_size]px; fill:[text_color]; font-weight:bold;"
        |        text-anchor="middle" 
        |        alignment-baseline="central"
        |        >[text]
        |    </text>
        `
    }

    render() {
        return replacingPlaceHolders(this.shapeStr, this.values)
    }

    getSvgString(){
        return replacingPlaceHolders(this.template, this.values).replace(/\s+\|/g, "\n")
    }

    setColor(colorStr){
        this.values.shape_color = colorStr
        return this.getSvgString()
    }

    ajustText(inlinePosition, stackedPosition = null){

        // if stackedPosition
        if(this.values.stack_letters == 'yes' && stackedPosition && Object.values(stackedPosition).length) {
            const { size, position } = stackedPosition
            this.values.font_size = Math.min(this.values.height, this.values.width) * size
            this.values.ty = this.values.height * position

            const newValues1 = {...this.values, text: this.values.text[0] }
            this.textTemplate1 = replacingPlaceHolders(this.textTemplate, newValues1)
            
            const newValues2 = {...this.values, 
                text: this.values.text.slice(1), ty: this.values.ty + this.values.font_size
            }
            this.textTemplate2 = replacingPlaceHolders(this.textTemplate, newValues2)
        }

        // if inlinePosition
        if(stackedPosition == null || this.values.stack_letters == 'no' && Object.values(inlinePosition).length){
            const { size, position } = inlinePosition
            this.values.font_size = Math.min(this.values.height, this.values.width) * size
            this.values.ty = this.values.height * position

            this.values.font_size = this.values.height * size
            this.values.ty = this.values.height *position
        }
    }
}

class Circle extends Shape {
    constructor(obj) {
        super(obj)
        this.values.r = Math.min(obj.height, obj.width) / 2
        this.textTemplate1 = this.textTemplate

        // if one letter
        this.ajustText({ size: .7, position:.55 })

        // if two Letters
        if(obj.text.length == 2) {
            this.ajustText({ size: .42, position:.52 }, { size: .45, position:.3 })
        }
    
        // if three Letters
        if(obj.text.length == 3){
            this.ajustText({ size: .3, position:.5 }, { size: .4, position:.26 })
        }

        this.shapeStr = '<circle cx="[cx]" cy="[cy]" r="[r]" fill="[shape_color]" />'

        // the | are just to add the proper formatting and spaces when saving string to the file
        this.template = `
            |<svg viewBox="0 0 [width] [height]" width="[width]" height="[height]" xmlns="http://www.w3.org/2000/svg">
            |    ${this.shapeStr}
            |    ${this.textTemplate1}
            |    ${this.textTemplate2 || ''}
            |</svg>
        `
    }
}

class Square extends Shape {
    constructor(obj) {
        super(obj)
        this.textTemplate1 = this.textTemplate

        // if one letter
        this.ajustText({ size: .9, position:.55 })

        // if two Letters
        if(obj.text.length == 2) {
            this.ajustText({ size: .68, position:.5 },{ size: .48, position:.27 })
        }

        // if three Letters
        if(obj.text.length == 3){
            this.ajustText({ size: .46, position:.5 }, { size: .45, position:.26 })
        }

        this.shapeStr = '<rect width="[width]" height="[height]" fill="[shape_color]"/>'

        // the | are just to add the proper formatting and spaces when saving string to the file
        this.template = `
            |<svg viewBox="0 0 [width] [height]" width="[width]" height="[height]" xmlns="http://www.w3.org/2000/svg">
            |    ${this.shapeStr}
            |    ${this.textTemplate1}
            |    ${this.textTemplate2 || ''}
            |</svg>
        `
    }
}

class Triangle extends Shape {
    constructor(obj) {
        super(obj)
        this.values.font_size = obj.height * .6
        this.values.p_1x = obj.width / 2
        this.values.p_2x = obj.width
        this.values.p_2y = obj.height 
        this.values.p_3y = obj.height
        this.textTemplate1 = this.textTemplate

        // if one Letter
        this.ajustText({ size: .59, position:.73 })

        // if two Letters
        if(obj.text.length == 2) {
            this.ajustText({ size: .42, position:.8 }, { size: .35, position:.47 })
        }

        // if three Letters
        if(obj.text.length == 3){
            this.ajustText({ size: .33, position:.83 }, { size: .35, position:.45 })
        }

        this.shapeStr = '<polygon points="[p_1x],0 [p_2x],[p_2y] 0,[p_3y]" fill="[shape_color]"/>'

        // the | are just to add the proper formatting and spaces when saving string to the file
        this.template = `
            |<svg viewBox="0 0 [width] [height]" width="[width]" height="[height]" xmlns="http://www.w3.org/2000/svg">
            |    ${this.shapeStr}
            |    ${this.textTemplate1}
            |    ${this.textTemplate2 || ''}
            |</svg>
        `
    }
}

export { Circle, Triangle, Square };
