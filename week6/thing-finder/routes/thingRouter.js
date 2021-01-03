const express = require('express');
const thingRouter = express.Router();
const { v4: uuidv4 } = require('uuid');

const things = [
    {
        name: "banana",
        type: "food",
        price: 2,
        _id: uuidv4()
    },
    {
        name: "fried chicken",
        type: "food",
        price: 15,
        _id: uuidv4()
    },
    {
        name: "computer",
        type: "technology",
        price: 2500,
        _id: uuidv4()
    },
    {
        name: "VR Headset",
        type: "technology",
        price: 1058,
        _id: uuidv4()
    },
    {
        name: "Mountain Dew",
        type: "drink",
        price: 5,
        _id: uuidv4()
    },
    {
        name: "Dr Pepper",
        type: "drink",
        price: 5,
        _id: uuidv4()
    }
];

thingRouter.route("/")
.get((req, res, next) => {

    // If there is a query with "type=", filter the items.
    if(req.query.type) {
        const newData = things.filter(thing => thing.type === req.query.type);
        if(newData.length !== 0) {
            // The newData has at least one item to display
            res.status(200).send(newData);
        } else {
            // Not found
            res.status(404);
            const error = new Error(`There are no items with type: ${req.query.type}.`);
            return next(error);
        }
    
    } else {

    // If no query was found, send the entire list back.
    res.status(200).send(things)
    }
})

module.exports = thingRouter;
