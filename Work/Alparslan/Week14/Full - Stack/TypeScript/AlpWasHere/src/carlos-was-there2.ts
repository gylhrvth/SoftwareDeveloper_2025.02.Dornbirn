interface AddressType {
        street: string;
        city: string;
        state: string;
        zip: string;
}   


interface PersonType {
    firstName: string;
    lastName: string;
    age: number;
    isActive: boolean;
    address: AddressType;
    phone: string;
    email: string;
}

const customer: PersonType = {
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


function greeting(person: PersonType): string {
    const _firstName: string = person.firstName;
    const _lastName: string = person.lastName;

    return `Hello, ${person.firstName} ${person.lastName}!`;
}

function greeting2({ firstName, lastName }: PersonType): string {
    return `Hello, ${firstName} ${lastName}!`;

}


console.log("Carlos was here!");
console.log(greeting(customer));
console.log(greeting2(customer));