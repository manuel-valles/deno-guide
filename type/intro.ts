// boolean, number, string, string[], Array<string>, object, null, undefined
// Tuple
let basket: [string, number];
basket = ['basketball', 6];

// Enum
enum Size { Small = 1, Medium = 2, Large = 3 };
let sizeName: string = Size[2];
let sizeValue: number = Size.Small;
console.log(sizeName, sizeValue);

// void
let sing = (): void => {
    console.log('lalala');
}

// never - it doesn't have a return or a reachable end point (e.g. console.log())
let error = (): never => {
    throw Error('LOL');
}

// interface
interface RobotArmy {
    count: number,
    type: string,
    magic?: string
}

let fightRobotArmy = (robots: RobotArmy) => {
    console.log('FIGHT!');
}

fightRobotArmy({ count: 1, type: 'dragon' })

// Function
const sum = (a: number, b: number): number => {
    return a + b;
}

const answer = sum(4, 5);
console.log(answer);

// Class [public variables by default]
class Animal {
    private sing: string = 'ssssshhh';
    constructor(sound: string) {
        this.sing = sound
    }

    greet(): string {
        return `Hello ${this.sing}`
    }
}

let lion = new Animal('RAAAWR');
console.log(lion.greet());

// Union
let confused: string | number | boolean = true