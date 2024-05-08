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
    constructor(radius) {
        super();
        this.radius = radius;
    }

    area() { return Math.PI * this.radius ** 2; }
}

// square class
class Square extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    area() { return this.width * this.height; }
}

// triangle class
class Triangle extends Shape {
    constructor(base, height) {
        super();
        this.base = base;
        this.height = height;
    }

    area() { return 0.5 * this.base * this.height; }
}

export { Circle, Triangle, Square };
