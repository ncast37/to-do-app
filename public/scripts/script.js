// import response from 'express';
import authenticate from './authService.js';



const signUpButton = document.querySelector('#signup-btn');

// Signup process begins here
document.querySelector('form').addEventListener('submit', (e) => {
    console.time('signupEvent')
    e.preventDefault();


    // create request object with form data
    const request = {
        body: {
            username: document.querySelector('#username').value,
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value
        }
    }

    //create auth object with request object
    let auth = authenticate(request);

    //run validator functions against desired fields
    const fieldsToValidate = ['username', 'password', 'email'];
    let invalidField = auth.validateFields(fieldsToValidate);
    if (invalidField) {
        console.log(`Invalid ${invalidField}`);
        console.timeEnd('signupEvent')
        return;
    }

    //send to server

    fetch('/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: request.body.username,
            email: request.body.email,
            password: request.body.password,
            admin: false
        })
    })
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data);
        //     console.timeEnd('signupEvent')
        // })
        .catch(err => console.log(err))
})


