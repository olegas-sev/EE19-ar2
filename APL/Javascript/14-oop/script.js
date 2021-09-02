/////////////////////////////////////
// 4 OOP Principles
////////////////////////
// Short description
//
// 1. Abstraction
// - Don't include data user doesn't need away
//
// 2. Encapsulation
// - Encapsulate data regular user doesn't need in order to use
//
// 3. Inheritance
// - Making all props and methods of a class available to a child class, form a hierarchical relationship between them

// 4. Polymorphism
// - Child classes can overwrite method that was inherited from a parent class

////////////////////////
// Constructor functions
//
/*
const Person = function(fullName, birthYear) {
    // Checking if step 3 is true
    console.log('this', this);
    this.name = fullName
    this.birthYear = birthYear

    // Very bad practise, the function will be created on each new instance
    // instead we want it to inherit a function from a parent
    // this.calcAge = function() {
    //    console.log(this.name);
    // }
}

const olegas = new Person('Olegas', 2003)
const maram = new Person('Maram', 1997)
// When "new" operator is runned:
// 1. New object is created
// 2. Function is called, "this" keyword will point to new object from step 1.
// 3. Object linked to prototype
// 4. Function automatically returns object
console.log(olegas, maram);

// An object created from a constructor is called an instance (in JS)
console.log(olegas instanceof Person);

// Prototypes
console.log('Prototype: ', Person.prototype);
Person.prototype.calcAge = function() {
    console.log(2021 - this.birthYear);
}

olegas.calcAge()
maram.calcAge()

console.log(olegas.__proto__);
console.log(Person.prototype);
console.log(olegas.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(olegas));
console.log(Person.prototype.isPrototypeOf(Person));

// Person.prototype isnt prototype of objects created with it, its storage that will be used for all linked Object 

Person.prototype.species = 'Homo Sapiens'
console.log('Olegas specie: ',olegas.species, '\nMaram specie: ', maram.species)

// We can in the same way add methods to in built objects like Array?
Array.prototype.unique = function () {
    return [...new Set(this)]
}
const arr = ['duplicate', 'duplicate', 2, 2, 2, 1]
console.log(arr.unique());
*/

////////////////////////
// Constructor functions
// ES6 Classes
//

// Class expression
// const PersonCl = class {}

// Class declaration
class PersonCl {
    constructor(fullName, birthYear) {
        this.fullName = fullName
        this.birthYear = birthYear
    }
    // Methods will be added to PersonCl.prototype 
    calcAge() {
        console.log(this.fullName, 'is', 2021 - this.birthYear);
    }
    greet() {
        console.log(`Hey ${this.fullName}`);
    }
    get age() {
        return 2021 - this.birthYear
    }
    set fullName(name) {
        if (name.includes(' ')) this._fullName = name
        else alert(`${name} not a full name`)
    }
    get fullName() {
        return this._fullName
    }
}

const maram = new PersonCl('Maram AlSth', 1997)
maram.calcAge()
console.log(maram);

console.log(maram.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function() {
//     console.log(`Hey ${this.fullName}`);
// }

maram.greet()

// 1. Classes are not hoisted
// 2. Classes are first-class citizes
// 3. Classes are executed in strict mode

const walter = new PersonCl('Walter Smith', 1965)

////////////////////////
// Getters & Setters
// 
const account = {
    owner: 'olegas',
    movements: [120, 110, -5, 10, 25],
    get latest() {
        return this.movements.slice(-1).pop()
    },
    set latest(mov) {
        this.movements.push(mov)
    }
    
}
console.log(account.latest);
account.latest = 50
console.log(account.latest);