const add = (a, b) => a + b;
const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`;

test('Should add two no.s', () => {
    const result = add(3,4);

    // if (result !== 7 ) {
    //     throw new Error(`Add didnt work as expected. 3 + 4 gave ${result}. Expected 7`);
    // }
    // pass the value in what to the assertion about
    expect(result).toBe(7);
});

test('greetings testing', () => {
    const greetings = generateGreeting('John');
    expect(greetings).toBe(`Hello John!`);
});

test('greetings testing for no name', () => {
    const greetings = generateGreeting();
    expect(greetings).toBe(`Hello Anonymous!`);
});