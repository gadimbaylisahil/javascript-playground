/*
* EasyHTTP Library
* @version 2.0.0
* @author Sahil Gadimbayli
* @license MIT
*
*
* */

class EasyHTTP{
    static get(url){
    //    make http get request
    //    this is still synchronous
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
}
//asynch way
class EasyHTTP{
    static get(url){
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
}

// Post request example
class EasyHTTP{
    static post(url, data){
        return new Promise((resolve, reject) => {
           fetch(url, {
               method: 'POST',
               headers: {
                   'Content-type:' 'application/json'
               },
               body: JSON.stringify(data)
           })
           .then(res => res.json())
           .then(data => resolve(data))
           .catch(err => resolve(err));
        });
    }
}

// put request example
class EasyHTTP{
    static put(url, data){
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type:' 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(err => resolve(err));
        });
    }
}

// delete request example
class EasyHTTP{
    static delete(url){
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type:' 'application/json'
                }
            })
                .then(res => res.json())
                .then(() => resolve('Resource deleted'))
                .catch(err => resolve(err));
        });
    }
}

