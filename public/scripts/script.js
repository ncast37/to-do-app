import authfunction from './auth.js';



const signUpButton = document.querySelector('#signup-btn');


signUpButton.addEventListener('click', (e) => {
    e.preventDefault();

    const request = {
        body: {
            username: document.querySelector('#username').value,
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value
        }
    }

    let auth = authfunction(request);



    if (!auth.validateUsername()) {

        console.log('Invalid username');
        return;

    }

    if (!auth.validatePassword()) {

        console.log('Invalid password');
        return;

    }

    if (!auth.validateEmail()) {

        console.log('Invalid email');
        return;
    }

    console.log('Valid username and password');
});

