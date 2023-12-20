const { Sequelize, DataTypes } = require('sequelize');
const md5 = require('md5');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../db.sqlite'
})

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        unique: false
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    plan: {
        type: DataTypes.STRING,
        defaultValue: 'free'
    }
});

sequelize.sync({ force: false })
    .then(async () => {
        console.log(`Database & tables created!`);
    });


function register(username, email, password, admin) {

    return User.create({
        username: username,
        email: email,
        password: md5(password),
        admin: admin,
        active: true,
        plan: 'free'
    });
}

function getUsersList() {
    return User.findAll();
}

function deleteUser(id) {
    return User.destroy({
        where: {
            id: id
        }
    })
}

function getUser(username, password) {
    return User.findOne({
        where: {
            username: username,
            password: md5(password)
        }
    })
}






module.exports = {
    User,
    register,
    getUsersList,
    deleteUser,
    getUser
}

