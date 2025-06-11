const customer = {
    firstName: "Carlos",
    lastName: "Gomez",
    age: 30,
    isActive: true,
    address: {
        street: "123 Main St",
        city: "Springfield",
        state: "IL",
        zip: "62701"
    },
    phone: "555-1234",
    email: "carlos@carlos.at"
}


function greeting(person) {
    return `Hello, ${person.firstName} ${person.lastName}!`;
}

function greeting2({ firstName, lastName }) {
    return `Hello, ${firstName} ${lastName}!`;

}


console.log("Carlos was here!");
console.log(greeting(customer));
console.log(greeting2(customer));