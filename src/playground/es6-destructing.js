// destructure the object properties to allow the code to be more readable
const person = {
    name: 'Jayraj',
    age: 24,
    location: {
        city: 'Bareilly',
        temp: 92
    }
};
//  creating sepate varibles for those values
// renaming + giving a default value to the property from the destructured object
const { name:firstName = 'Anonymous', age } = person;
console.log(`${firstName} is ${age}`);

const { city, temp:temperature } = person.location;
console.log(`${city} has a temperature of ${temperature}`);

const book = {
    title: 'Harry Potter',
    author: 'JK Rowling',
    publisher: {
        name: 'Jayraj'
    }
};

const { name: publisherName = 'Self-Published' } = book.publisher;
console.log(publisherName);

// Array Destructuring
const address = ['21 Baker Street', 'SomeState', 'London', 'UK'];

const [, state, myCity = 'New York'] = address;

console.log(`You are in ${state}, ${myCity}`);

const item = ['coffee', '1.50', '2.50', '3.0'];
const [ itemName, , mediumPrice ] = item;
console.log(`A medium ${itemName} costs ${mediumPrice}`);

// destructing func arguments
const add = ({ a, b}) => {
    return a + b;
}

console.log(add({ a: 1, b: 2}));

// spread operator for spreading arrays and objects(for obj babel plugin has to be used)
const  names = ['aj', 'jk', 'ak'];
const newArray = [...names, 'ka'];
console.log(names);
console.log(newArray);

const user = {
    name: 'Jka',
    age: 24
};
// overides the values
console.log({...user, age: 25});