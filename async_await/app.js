// // Async in the beginning makes return a promise
//
// async function myFunc(){
//     const promise = new Promise((resolve, reject) =>{
//         setTimeout(() => resolve('Hello'), 1000);
//     });
//
//     const error = true;
//     if(!error){
//         const res = await promise;
//     } else {
//         await promise.reject(new Error('Something went wrong'));
//     }
// }
//
// myFunc()
//     .then(res => console.log(res))
//     .catch(err => console.log(err));
//


async function getUsers() {
    const response = await fetch
    ('api url here');
    // proceed when above promise is resolved
    const data = await response.json();

    // only proceed once the promise before resolved
    return data;
}

getUsers()
    .then(users => console.log(users));