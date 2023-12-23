export const createEmailValidator = (email) => ({
    validate: () => email
        && email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
})

export const createPasswordValidator = (password) => ({
    validate: () => password
        && password.length >= 9
        && password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).+$/)
})

export const createUsernameValidator = (username) => ({
    validate: () => !!username
})


