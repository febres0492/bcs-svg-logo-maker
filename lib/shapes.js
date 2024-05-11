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
        return `${this.str} area: ${this.area()}`;
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
        this.str = `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="50" />
            </svg>`
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
        this.str = `
            <svg viewBox="0 0 220 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" />
            </svg> `
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
        this.str = `
            <svg height="220" width="500" xmlns="http://www.w3.org/2000/svg">
                <polygon points="100,10 150,190 50,190" style="fill:lime;stroke:purple;stroke-width:3" />
            </svg>
        `
    }

    area() { return 0.5 * this.base * this.height; }
}

export { Circle, Triangle, Square };
