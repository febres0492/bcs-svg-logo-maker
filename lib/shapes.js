import { replacingPlaceHolders } from './utils.js'

class Shape {
    constructor(obj) {
        obj.font_size = obj.width * .9
        obj.cx = obj.width /2
        obj.cy = obj.height /2
        obj.tx = (obj.width /2)
        obj.ty = obj.height /2
        this.values = obj

        this.textTemplate = `
            <text x="[tx]" y="[ty]" 
                style="font-family:Arial; font-size:[font_size]px; fill:[text_color]; font-weight:bold;"
                text-anchor="middle" 
                alignment-baseline="central"
                >[text]
            </text>
        `
    }

    render() {
        return replacingPlaceHolders(this.template, this.values)
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
            this.ajustText({ size: .28, position:.5 }, { size: .4, position:.26 })
        }
        
        this.template = `
            <svg viewBox="0 0 [width] [height]" width="[width]" height="[height]" xmlns="http://www.w3.org/2000/svg">
                <circle cx="[cx]" cy="[cy]" r="[r]" fill="[shape_color]" />
                ${this.textTemplate1}
                ${this.textTemplate2 || ''}
            </svg>
        `
    }
}

class Square extends Shape {
    constructor(obj) {
        super(obj)
        this.textTemplate1 = this.textTemplate

        // if one letter
        this.ajustText({ size: .8, position:.55 })

        // if two Letters
        if(obj.text.length == 2) {
            this.ajustText({ size: .48, position:.5 },{ size: .48, position:.27 })
        }

        // if three Letters
        if(obj.text.length == 3){
            this.ajustText({ size: .3, position:.5 }, { size: .45, position:.26 })
        }

        this.template = `
            <svg viewBox="0 0 [width] [height]" width="[width]" height="[height]" xmlns="http://www.w3.org/2000/svg">
                <rect width="[width]" height="[height]" fill="[shape_color]"/>
                ${this.textTemplate1}
                ${this.textTemplate2 || ''}
            </svg>
        `
    }
}

class Triangle extends Shape {
    constructor(obj) {
        super(obj)
        this.values.font_size = obj.height * .6 
        this.values.p_1a = obj.width / 2
        this.values.p_2a = obj.width
        this.values.p_2b = obj.height
        this.values.p_3b = obj.height
        this.textTemplate1 = this.textTemplate

        // if one Letter
        this.ajustText({ size: .45, position:.76 })

        // if two Letters
        if(obj.text.length == 2) {
            this.ajustText({ size: .3, position:.82 }, { size: .3, position:.53 })
        }

        // if three Letters
        if(obj.text.length == 3){
            this.ajustText({ size: .23, position:.87 }, { size: .3, position:.53 })
        }

        this.template = `
            <svg viewBox="0 0 [width] [height]" width="[width]" height="[height]" xmlns="http://www.w3.org/2000/svg">
                <polygon points="[p_1a],0 [p_2a],[p_2b] 0,[p_3b]" fill="[shape_color]"/>
                ${this.textTemplate1}
                ${this.textTemplate2 || ''}
            </svg>
        `
    }
}

export { Circle, Triangle, Square };
