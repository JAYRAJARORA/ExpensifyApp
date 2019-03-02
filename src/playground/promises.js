const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'jka',
            age: 24
        });
        // reject('Something goes wrong');
    }, 5000);
});

console.log('before');

promise.then((data) => {
    console.log(data);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('this is another promise');
            // reject('Something goes wrong');
        }, 5000);
    });
}).then((str) => {
    console.log('in then call 2. value: ',str);
}).catch((error) => {
    console.log('error', error);
});

console.log('after');

// promise chaining reduces the need of the nested callbacks