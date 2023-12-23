import { createEmailValidator, createPasswordValidator, createUsernameValidator } from "./validators.js";


export default function (request) {

    let user = {
        username: createUsernameValidator(request.body.username),
        email: createEmailValidator(request.body.email),
        password: createPasswordValidator(request.body.password),

        validateFields: function (fields) {
            for (let field of fields) {
                const validateMethod = '.validate';

                if (!this[`${field}`].validate()) {
                    console.log(`Invalid ${field}`);
                    return field;
                }
            }
            console.log('All fields are valid');
            return null;
        }
    }

    return user;

}