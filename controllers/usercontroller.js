let User = require('../models/User.js');
let List = require('../models/List.js');

async function createUser(req, res, next) {
    console.log('creating user')
    console.log(req.body)
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let admin = req.body.admin;


    // Run checks on user data

    if (!username) {
        res.status(400).json({ message: "username is required" });
        return;
    }

    if (!email) {
        res.status(400).json({ message: "Password is required" })
        return
    }

    if (password.length < 9) {
        res.status(400).json({ message: "Insufficient Password Lenght" })
        return
    }

    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z]).+$/)) {
        // Password does not containe both uppercase and lowercase letters
        res.status(400).json({ message: "Password must container at least one lower and uppercase character" })
        return
    }

    if (!password.match(/[^a-zA-Z0-9]/)) {
        // Password does not contain a special character
        res.status(400).json({ message: "Password must contain at least one special character" });
        return;
    }

    // Send to database
    try {
        await User.register(username, email, password, admin)
        res.status(201).json({ message: "User created successfully" })
        return
    }
    catch (err) {
        res.status(500).json({
            message: err.message +
                "This is the error message from the controller"
        })
        return
    }
}

async function getUsers(req, res, next) {
    try {
        console.log('going to look for users')
        let users = await User.getUsersList();
        console.log('found users')
        res.status(200).json(users);
    }
    catch (err) {
        console.log('caught it!')
        res.status(500).json({ message: err.message })
    }
}

async function removeUser(req, res, next) {
    try {
        console.log(req.params.id)
        let id = req.params.id;
        await User.deleteUser(id);
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function login(req, res, next) {
    try {
        let username = req.body.username;
        let password = req.body.password;

        const user = await User.getUser(username, password);
        if (!user) {
            res.status(401).json({ message: "Invalid Credentials" })
            return
        }

        req.session.userId = user.id;

        return res.status(200).json({ message: "Login successful" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


function checkAuth(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    console.log("they legit");
    next();
}


async function createList(req, res, next) {
    try {
        let listName = req.body.name;
        let listDescription = req.body.description;
        let userId = req.session.userId;
        const list = await List.insertList(listName, listDescription, userId);

        if (!list) {
            res.status(401).json({ message: "Unable to create list" })
            return
        }
        return res.status(200).json({ message: "List created successfully" })

    } catch (err) {
        res.status(500).json({ message: err.message })

    }
}


async function getLists(req, res, next) {
    try {

        let userId = req.session.userId;
        const lists = await List.fetchLists(userId);
        if (!lists) {
            res.status(401).json({ message: "Unable to fetch lists" })
            return
        }
        return res.status(200).json(lists)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function deleteSelectedList(req, res, next) {
    console.log('deleteSelectedList')
    try {
        console.log('req.param.id: ', req.params.id)
        let id = req.params.id;
        await List.deleteList(id);
        res.status(200).json({ message: "List deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err.message + "didn't work yoo" })
    }
}


module.exports = {
    createUser,
    getUsers,
    removeUser,
    login,
    checkAuth,
    createList,
    getLists,
    deleteSelectedList
}