

function greet(name: string): void { console.log("Hello, " + name); }

greet("World");

//Explicit Type:

let firstName: string = "John";

console.log(firstName);
console.log(typeof firstName);

//Implicit Type:
///Having TypeScript "guess" the type of a value is called infer.

let secondName = "Doe";
console.log(secondName);
console.log(typeof secondName);

//TypeScript will throw an error if you try to assign a value of a different type to a variable with an explicit type.

let age: number;
//age = "Federico"; // Error: Type 'string' is not assignable to type 'number'

age = 30 // This is correct

//This also worls for infered types:
let age2 = 30;
//age2 = "Federico"; // Error: Type 'string' is not assignable to type 'number'

//TypeScript may not always properly infer what the type of a variable may be. In such cases, it will set the type to any which disables type checking.

const json = JSON.parse("55");
console.log(typeof json); // number

const json2 = JSON.parse('"55"');
console.log(typeof json2); // string

// 'any' is a special type in TypeScript that allows you to assign any value to it. It disables type checking for that variable, which can be useful in certain situations, but should be used sparingly as it defeats the purpose of TypeScript's type system.

let u = true; // boolean
//u = "Hello"; //  Error: Type 'string' is not assignable to type 'boolean'.
//Math.round(u); // Error: Argument of type 'boolean' is not assignable to parameter of type 'number'.

