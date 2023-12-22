


export default function (request) {

    let user = {
        username: request.body.username,
        email: request.body.email,
        password: request.body.password,

        validateUsername: function () {
            if (!this.username) {
                return false;
            }

            return true;
        },

        validatePassword: function () {
            if (!this.password) {
                return false;
            }


            if (this.password.length < 9) {
                return false;
            }

            if (!this.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).+$/)) {
                return false;
            }

            return true;

        },

        validateEmail: function () {
            if (!this.email) {
                return false;
            }

            if (!this.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
                return false;
            }

            return true;

        }
    }

    return user;

}