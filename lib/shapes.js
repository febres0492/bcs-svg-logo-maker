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

    handleWrongInput(inputs){
        // this will throw error if any input is not type number
        inputs.some(val => {
            if(typeof val != 'number'){
                throw new Error(`Class ${this.constructor.name} input most be type number`)
            }
        })
    }
}

class Circle extends Shape {
    constructor(obj) {
        super();
        this.handleWrongInput(Object.values(obj))
        const { radius } = obj
        this.radius = radius;
    }

    area() { return Math.PI * this.radius ** 2; }
}

class Square extends Shape {
    constructor(obj) {
        super();
        this.handleWrongInput(Object.values(obj))
        const { width, height } = obj
        this.width = width;
        this.height = height;
    }

    area() { return this.width * this.height; }
}

class Triangle extends Shape {
    constructor(obj) {
        super();
        this.handleWrongInput(Object.values(obj))
        const { base, height } =  obj

        this.base = base;
        this.height = height;
    }

    area() { return 0.5 * this.base * this.height; }
}

export { Circle, Triangle, Square };
