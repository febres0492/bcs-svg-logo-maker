// shape class
class Shape {
    constructor() {
        if (new.target === Shape) {
            throw new Error('Shape cannot be instantiated');
        }
    }

    setColor(color){
        this.color = color
    }

    render() {
        return `${this.constructor.name} area: ${this.area()}`;
    }
}

// circle class
class Circle extends Shape {
    constructor(obj) {
        super();
        handleError(this.constructor.name, ...Object.values(obj))
        const { radius } = obj
        this.radius = radius;
    }

    area() { return Math.PI * this.radius ** 2; }
}

// square class
class Square extends Shape {
    constructor(obj) {
        super();
        handleError(this.constructor.name, ...Object.values(obj))
        const { width, height } = obj
        this.width = width;
        this.height = height;
    }

    area() { return this.width * this.height; }
}

// triangle class
class Triangle extends Shape {
    constructor(obj) {
        super();
        handleError(this.constructor.name, ...Object.values(obj))
        console.log('obj', obj)
        const { base, height } =  obj
        
        this.base = base;
        this.height = height;
    }

    area() { return 0.5 * this.base * this.height; }
}


function handleError(objName, ...args){
    // this will throw error if any args input is not type number
    args.some(val => {
        if(typeof val != 'number'){
            throw new Error(`Class ${objName} input most be type number`)
        }
    })
}

export { Circle, Triangle, Square };
