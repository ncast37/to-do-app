const express = require('express');
const session = require('express-session');
const PORT = 3000;
const app = express();
const { createUser,
    getUsers,
    removeUser,
    login,
    logout,
    checkAuth,
    createList,
    getLists,
    deleteSelectedList } = require('./controllers/usercontroller.js')
const { createItem, getItemsbyList, getAllItemsbyUser, deleteSelectedItemByUser, deleteAllItemsbyUser } = require('./controllers/itemcontroller.js')

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to the app" })
});

//user account routes
app.get('/', (req, res) => {
    //return index.html

    res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.post('/user/signup', createUser);
app.get('/users/', getUsers);
app.delete('/user/delete/:id', removeUser);
app.post('/user/login', login);
app.get('/user/logout', checkAuth, logout)


//list routes

app.post('/user/createlist', checkAuth, createList);
app.get('/user/lists', checkAuth, getLists);
app.delete('/user/list/delete/:id', checkAuth, deleteSelectedList);


//item routes

app.post('/user/list/:id/createitem', checkAuth, createItem);
app.get('/user/list/:id/items', checkAuth, getItemsbyList);
app.get('/user/list/items', checkAuth, getAllItemsbyUser);
app.delete('/user/list/item/delete/:id', checkAuth, deleteSelectedItemByUser);
app.delete('/user/list/items/delete/allitems', checkAuth, deleteAllItemsbyUser);

app.listen(PORT, () => {
    console.log(`Sever running and listening on port ${PORT}`)
})