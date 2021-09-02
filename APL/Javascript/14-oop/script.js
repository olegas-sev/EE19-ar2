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
const Person = function(firstName, birthYear) {
    // Checking if step 3 is true
    console.log('this', this);
    this.name = firstName
    this.birthYear = birthYear

    /*
    // Very bad practise, the function will be created on each new instance
    // instead we want it to inherit a function from a parent
    this.calcAge = function() {
        console.log(this.name);
    }
    */
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

