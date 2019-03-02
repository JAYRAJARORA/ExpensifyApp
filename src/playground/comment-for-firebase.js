
// database.ref('age').set(27);
// database.ref('location/city').set('NewYork');


database.ref('attributes').set({
    height: 172,
    weight: 95
}).then(() => {
    console.log('Data saved!');
}).catch((e) => {
    console.log('Error', e);
});



// listen to some changes(subscribing), server notifies us about the change
// using on we can get data initailly and also during all changes made to that data
// returns the callback function(2nd value)

// database.ref('expenses').push({
//     description: 'Phone bill',
//     note: 'This is a phone bill',
//     amount: 34.4,
//     createdAt: 1000
// });

// database.ref('expenses').push({
//     description: 'Water bill',
//     note: 'This is a water bill',
//     amount: 45.4,
//     createdAt: 3000
// })

// database.ref('expenses').push({
//     description: 'Gas bill',
//     note: 'This is a gas bill',
//     amount: 33,
//     createdAt: 1000
// })

// database.ref('expenses').once('value')
//     .then((snapshot) => {
//         const expenses = [];
//         snapshot.forEach(childSnapshot => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         });
//         console.log(expenses);
//     });

// returns the removed child
database.ref('expenses').on('child_removed', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
});


// returns the changed child
database.ref('expenses').on('child_changed', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
})

// child_added (once for already present expenses another for new ones)
database.ref('expenses').on('child_added', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
})


// database.ref('expenses').on('value', (snapshot) => {
//     const expenses = [];
//     snapshot.forEach(childSnapshot => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });
//     console.log(expenses);
// });



// database.ref().on('value', (snapshot) => {
//     const userObj = snapshot.val();
//     console.log(`${userObj.name} is a ${userObj.job.title} at ${userObj.job.company}`);
// });


// const onValueChange = database.ref().on('value',(snapshot) => {
//     console.log('value', snapshot.val());
// }, (e) => {
//     console.log('Error', e);
// });


// setTimeout(() => {
//     database.ref('age').set(31);
// }, 3500);
// // unsubscribing to changes
// setTimeout(() => {
//     database.ref().off(onValueChange);
// }, 7000);


// setTimeout(() => {
//     database.ref('age').set(34);
// }, 10500);

// get the data single time and functions never re-run
// database.ref('location/city')
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     }).catch((e) => {
//         console.log('Error fetching data', e);
//     });




// database.ref().set({
//     name: 'Jayraj Arora',
//     age: 24,
//     isSingle: true,
//     stressLevel: 6,
//     job: {
//         title: 'Software developer',
//         company: 'google'
//     },
//     location: {
//         city: 'Bareilly',
//         country: 'Philli'
//     }
// }).then(() => {
//     console.log('Data is saved!');
// }).catch((e) => {
//     console.log('This failed', e);
// });

// it only actually updates at the root level overrides child object completelyifgiven
// can be done using location/city propertythough
// database.ref().update({
//     name: 'Jayraj Money',
//     age: 25,
//     isSingle: null,
//     job: 'Manager',
//     // location: {
//     //     city: 'Boston'
//     // }
//     'location/city': 'Boston'
// });

// database.ref().update({
//     stressLevel: 9,
//     'location/city': 'Seattle',
//     'job/company': 'Amazon'
// });



// database.ref('isSingle').remove().then(() => {
//     console.log('Successfully removed');
// }).catch((e) => {
//     console.log('Error', e);
// });

// database.ref('isSingle').set(null);

