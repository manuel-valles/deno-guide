// boolean, number, string, string[], Array<string>, object, null, undefined
// Tuple
var basket;
basket = ['basketball', 6];
// Enum
var Size;
(function (Size) {
    Size[Size["Small"] = 1] = "Small";
    Size[Size["Medium"] = 2] = "Medium";
    Size[Size["Large"] = 3] = "Large";
})(Size || (Size = {}));
;
var sizeName = Size[2];
var sizeValue = Size.Small;
console.log(sizeName, sizeValue);
// void
var sing = function () {
    console.log('lalala');
};
// never - it doesn't have a return or a reachable end point (e.g. console.log())
var error = function () {
    throw Error('LOL');
};
var fightRobotArmy = function (robots) {
    console.log('FIGHT!');
};
fightRobotArmy({ count: 1, type: 'dragon' });
// Function
var sum = function (a, b) {
    return a + b;
};
var answer = sum(4, 5);
console.log(answer);
// Class [public variables by default]
var Animal = /** @class */ (function () {
    function Animal(sound) {
        this.sing = 'ssssshhh';
        this.sing = sound;
    }
    Animal.prototype.greet = function () {
        return "Hello " + this.sing;
    };
    return Animal;
}());
var lion = new Animal('RAAAWR');
console.log(lion.greet());
// Union
var confused = true;
