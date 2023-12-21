const { Item } = require("../database");



async function createItem(req, res, next) {

    let listId = req.params.id;
    let itemName = req.body.name;
    let itemDescription = req.body.description;
    let itemStatus = req.body.status;
    let itemDateCreated = req.body.dateCreated;
    let itemDateDue = req.body.dateDue ? req.body.dateDue : "No due date";
    let itemDateCompleted = req.body.dateCompleted ? req.body.dateCompleted : "No completion date";
    let itemPriority = req.body.priority ? req.body.priority : "No priority";
    let userId = req.session.userId;

    try {

        const item = await Item.insertItem(
            itemName,
            itemDescription,
            itemStatus,
            itemDateCreated,
            itemDateDue,
            itemDateCompleted,
            itemPriority,
            listId,
            userId
        );

        if (item) {
            res.status(200).json({
                message: "Item created successfully",
                item
            });
        }

    } catch {
        res.status(500).json({ message: err.message })

    }


}


async function getItemsbyList(req, res, next) {
    try {
        let listId = req.params.id;
        let userId = req.session.userId;
        const items = await Item.fetchItems(listId, userId);
        if (!items) {
            res.status(401).json({ message: "Unable to fetch items" })
            return
        }
        console.log(items)
        return res.status(200).json(items)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }

}

async function getAllItemsbyUser(req, res, next) {
    try {
        let userId = req.session.userId;
        const items = await Item.fetchAllItemsbyUser(userId);
        if (!items) {
            res.status(401).json({ message: "Unable to fetch items" })
            return
        }
        return res.status(200).json(items)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function deleteAllItemsbyUser(req, res, next) {
    try {
        let userId = req.session.userId;
        const items = await Item.removeAllItemsbyUser(userId);
        if (!items) {
            res.status(401).json({ message: "Unable to delete items" })
            return
        }
        return res.status(200).json({ message: "Items deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function deleteSelectedItemByUser(req, res, next) {
    try {
        let itemId = req.params.id;
        let userId = req.session.userId;
        const item = await Item.deleteItem(itemId, userId);
        if (!item) {
            res.status(401).json({ message: "Unable to delete item" })
            return
        }
        return res.status(200).json({ message: "Item deleted successfully" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


module.exports = {
    createItem,
    getItemsbyList,
    getAllItemsbyUser,
    deleteSelectedItemByUser,
    deleteAllItemsbyUser
}