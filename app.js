const express = require('express');
const session = require('express-session');
const PORT = 3000;
const app = express();
const { createUser,
    getUsers,
    removeUser,
    login,
    checkAuth,
    createList,
    getLists,
    deleteSelectedList } = require('./controllers/usercontroller.js')


app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))


app.post('/user/signup', createUser);
app.get('/users/', getUsers);
app.delete('/user/delete/:id', removeUser);
app.post('/user/login', login);
app.post('/user/createlist', checkAuth, createList);
app.get('/user/lists', checkAuth, getLists);
app.delete('/user/list/delete/:id', checkAuth, deleteSelectedList);





app.listen(PORT, () => {
    console.log(`Sever running and listening on port ${PORT}`)
})