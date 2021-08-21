'use strict';
/*
/////////////////////////////////////////////
// Constructor functions and new Operator
//
// Constructor function (has prototype prop)
// Prototype has a pointer .constructor that points to constructor func
const Person = function(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;

    // Never create methods inside constructor
    // this.calcAge = function () {
    //     console.log(2021 - this.birthYear)
    // };
}
// 1.
const olegas = new Person('Olegas', 2003)
// 4.
console.log(olegas)

// Process:
// 1. New {} object created
// 2. this keyword in constructor function is set to the new object
// 3. the object is linked to constructors function prop propery just like class inheritance
// 4. the new object is returned from constructor function call


const maram = new Person('Maram', 1999)
const mikael = new Person('Mikael', 2003)
console.log(maram)

console.log(olegas instanceof Person)

/////////////////////////////////////////////
// Prototypes
//
Person.prototype.calcAge = function (currentYear) {
    console.log(currentYear - this.birthYear)
}
// even thought calcAge is located in __proto__ javascript first check objects props then goes into __proto__ prop and tries to find it there
olegas.calcAge(2021)
Person.prototype.species = 'Homo Sapiens'
console.log(olegas.species)
console.log('First name prop:', olegas.hasOwnProperty('firstName'))
console.log('species prop: ',olegas.hasOwnProperty('species'))
/////////////////////////////////////////////
// Porototypal inheritance
//
console.log(olegas.__proto__)
console.log(olegas.__proto__.__proto__)
// Object.prototype (top of prototype chain)
console.log(olegas.__proto__.__proto__.__proto__)

console.dir(Person.prototype.constructor)

const arr = [3, 3, 'Maram', 'Olegas', 'Mikael', 3]
// new Array === []
console.log(arr.__proto__)
console.log(arr.__proto__ === Array.prototype)


Array.prototype.unique = function () {
   return [...new Set(this)]
}
// Must be getter vvvvv
console.log(arr.unique())
// Why not to change built in constructors:
// 1. The new version of js might add feature with same name and your code will crash
// 2. If you work with developer team it will be gg :D

const h1 = document.querySelector('h1')
console.dir(h1)


/////////////////////////////////////////////
//  ES6 Classes
//
// Class expression
// const PersonCl = class {
//
// }
// Class declaration
class PersonCl {
    constructor(name, password) {
        this.username = name
        this.password = password
    }
    // Methods will be added to prototype prop of our constructor
    checkPassword(userInput) {
        return (userInput === this.password)
    }

}
const olegasCl = new PersonCl('Olegas', 'olegas200333')

PersonCl.prototype.greet = function () {
    return console.log(`Hi ${this.username} this is method through prototype!`)
}

console.log(olegasCl)
console.log(olegasCl.checkPassword('olegas200222'))
olegasCl.greet()

// Keep in mind
// 1. Classes aren't hoisted
// 2. Class are first-class citizens
// 3. Classes are executed in strict mode
*/


/*
/////////////////////////////////////////////
// Static method
Person.hey = function () {
    console.log('Hey there!')
}
Person.hey()
// Static method in classes
class Greeting {
    static assalamualaikum() {
        return console.log('Assalamualaikum my brother!')
    }
    static privet() {
        return console.log('Privet my friend!')
    }
}
Greeting.assalamualaikum()
Greeting.privet()

// Object.create
const PersonProto = {
    calcAge() {
        console.log(2021 - this.birthYear)
    },
    init(name, birthYear) {
        this.firstName = name
        this.birthYear = birthYear
    }
}
const steven = Object.create(PersonProto)
console.log(steven)
steven.name = 'Steven'
steven.birthYear = 2002;
steven.calcAge()

const sarah = Object.create(PersonProto)
sarah.init('Sarah', 1979)
console.log('Sarah: ', sarah)
*/

/////////////////////////////////////////////
// Inheritance between classes: constructor functions
//
const Person = function (firstName, birthYear) {
    this.firstName = firstName
    this.birthYear = birthYear

}
Person.prototype.calcAge = function () {
    console.log(2021 - this.birthYear)
}

const Student = function (firstName, birthYear, course) {
    Person.call(this, firstName, birthYear)
    this.course = course
}

// Linking prototypes
Student.prototype = Object.create(Person.prototype)

Student.prototype.introduce = function () {
    console.log(`Hi! My name is ${this.firstName} and I'm currently studying ${this.course}`)
}
const maram = new Student('Maram', 1999, 'Industrial Engineering')
console.log(maram)
maram.introduce()


Student.prototype.constructor = Student
console.dir(Student.prototype.constructor)