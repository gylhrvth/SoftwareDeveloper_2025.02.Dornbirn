function greet(name) { console.log("Hello, " + name); }
greet("World");
//Explicit Type:
var firstName = "John";
console.log(firstName);
console.log(typeof firstName);
//Implicit Type:
///Having TypeScript "guess" the type of a value is called infer.
var secondName = "Doe";
console.log(secondName);
console.log(typeof secondName);
//TypeScript will throw an error if you try to assign a value of a different type to a variable with an explicit type.
var age;
//age = "Federico"; // Error: Type 'string' is not assignable to type 'number'
age = 30; // This is correct
//This also worls for infered types:
var age2 = 30;
//age2 = "Federico"; // Error: Type 'string' is not assignable to type 'number'
//TypeScript may not always properly infer what the type of a variable may be. In such cases, it will set the type to any which disables type checking.
var json = JSON.parse("55");
console.log(typeof json); // number
var json2 = JSON.parse('"55"');
console.log(typeof json2); // string
// 'any' is a special type in TypeScript that allows you to assign any value to it. It disables type checking for that variable, which can be useful in certain situations, but should be used sparingly as it defeats the purpose of TypeScript's type system.
var u = true; // boolean
//u = "Hello"; //  Error: Type 'string' is not assignable to type 'boolean'.
//Math.round(u); // Error: Argument of type 'boolean' is not assignable to parameter of type 'number'.
var v = true;
v = "Hello"; // This is allowed
Math.round(v); // This is allowed, but it will throw a runtime error if v is not a number.
// any can be a useful way to get past errors since it disables type checking, but TypeScript will not be able provide type safety
var w = 1;
w = "string"; // no error
//unknown is a similar, but safer alternative to any
/*let x: never = true; // Error: Type 'boolean' is not assignable to type 'never'.
never effectively throws an error whenever it is defined.*/
//Arrays
var names = [];
names.push("Dylan");
//names.push(73); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.
var names2 = ["Pepe", "Juan"];
//names2.push("Jack"); // Error: Property 'push' does not exist on type 'readonly string[]'.
//Typed Arrays (Tuples)
var myTuple = ["John", true, 30];
//Tuples are great because they allow each element in the array to be a known type of value.
// In Tuples, the order of the elements matters. In this example, the first element must be a string, the second a boolean, and the third a number. If you try to assign a value of a different type to any of the elements, TypeScript will throw an error.
//Example:
//myTuple[0] = 30; // Error: Type 'number' is not assignable to type 'string'.
//A good practice is to make your tuple readonly:
var myTuple2 = ["John", true, 30];
//myTuple2.push("Something new and wrong"); // Error: Property 'push' does not exist on type 'readonly [string, boolean, number]'.
//Named tuples:
var graph = [13.2, 45.3];
//TypeScript Objects:
//TypeScript allows you to define the shape of an object using an interface or a type alias. This is useful for defining the structure of complex data types and ensuring that your code is type-safe.
//Inline type annotation:
var car = {
    type: "VW",
    model: "Golf",
    year: 2020
};
var car1 = {
    type: "VW",
    model: "Golf",
    year: 2020
};
var car2 = {
    type: "VW",
    model: "Golf",
    year: 2020
};
//What is the difference between an interface and a type alias?
//An interface is a way to define the shape of an object, while a type alias is a way to create a new name for an existing type. Interfaces are more powerful than type aliases because they can be extended and implemented, while type aliases cannot. However, type aliases are more flexible because they can be used to create unions and intersections of types, while interfaces cannot.
//In general, you should use interfaces when you want to define the shape of an object and type aliases when you want to create a new name for an existing type. However, both interfaces and type aliases can be used to define the shape of an object, so it is up to you to decide which one to use based on your needs.
//Optional properties:
var car3 = {
    type: "VW",
    model: "Golf"
};
//Optional properties are useful for defining the shape of an object when some properties may not be present. In this example, the year property is optional, so it can be omitted when creating a car object. If you try to assign a value of a different type to the year property, TypeScript will throw an error.
//Example:
//car3.year = "2020"; // Error: Type 'string' is not assignable to type 'number | undefined'.
//Index signature:
var scores = {
    Alice: 95,
    Bob: 87,
    Charlie: 78
};
//Index signatures are useful for defining the shape of an object when the keys are not known in advance. 
// In this example, the keys are the names of the students and the values are their scores. The index signature [studentName: string]: number means that the keys are strings and the values are numbers. If you try to assign a value of a different type to the scores object, TypeScript will throw an error.
// You can't run TypeScript files directly with Node.js. You need to compile them to JavaScript first. You can do this by running the following command in your terminal:
// tsc main.ts
// This will create a main.js file that you can run with Node.js:
//Alternatively, you can use the ts-node package to run TypeScript files directly. You can install it globally with npm install -g ts-node and then run your TypeScript file with ts-node main.ts.
// This will run the TypeScript file without needing to compile it to JavaScript first. However, this is not recommended for production code as it can slow down your application and make it harder to debug.
//Enum: A special "class" that allows you to define a set of named constants. Enums are useful for defining a set of related values that can be used in your code. Enums can be numeric or string-based. Numeric enums are the default type of enum in TypeScript, while string enums are a newer feature that was introduced in TypeScript 2.4.
var CardinalDirections;
(function (CardinalDirections) {
    CardinalDirections[CardinalDirections["North"] = 0] = "North";
    CardinalDirections[CardinalDirections["East"] = 1] = "East";
    CardinalDirections[CardinalDirections["South"] = 2] = "South";
    CardinalDirections[CardinalDirections["West"] = 3] = "West";
})(CardinalDirections || (CardinalDirections = {}));
var currentDirection = CardinalDirections.North; // This is how you assign a value to an enum
//By default, enums will initialize the first value to 0 and add 1 to each additional value:
console.log(CardinalDirections.North); // 0
//In TS with Node JS, enum is not supported in strip-only mode. 
// It will throw an error if you try to use it in strip-only mode.
// You can compile the main.ts into main.js with the following command:
// npx tsc main.ts
//And then run the main.js file with Node.js:
// node main.js
// This will run the JavaScript file without any errors.
//You can assingn unique number values for each enum value. Then the values will not incremented automatically:
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["NotFound"] = 404] = "NotFound";
    StatusCodes[StatusCodes["Success"] = 200] = "Success";
    StatusCodes[StatusCodes["BadRequest"] = 400] = "BadRequest";
    StatusCodes[StatusCodes["Accepted"] = 202] = "Accepted";
})(StatusCodes || (StatusCodes = {}));
console.log(StatusCodes.NotFound); // logs 404
console.log(StatusCodes.Success); // logs 200


