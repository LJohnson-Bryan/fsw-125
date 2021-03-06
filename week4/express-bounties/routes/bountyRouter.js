const express = require('express');
const bountyRouter = express.Router();
const { v4: uuidv4 } = require('uuid');

// Fake Database
const bounties = [
    {
        first_name: "Yoda",
        last_name: "undefined",
        type: "Jedi",
        living: false,
        price: 999999,
        _id: uuidv4()
    },
    {
        first_name: "Luke",
        last_name: "Skywalker",
        type: "Jedi",
        living: false,
        price: 15937,
        _id: uuidv4()
    },
    {
        first_name: "Darth",
        last_name: "Bane",
        type: "Sith",
        living: true,
        price: 9583,
        _id: uuidv4()
    },
    {
        first_name: "Darth",
        last_name: "Maul",
        type: "Sith",
        living: true,
        price: 2849,
        _id: uuidv4()
    }
];

// General bounty handling
bountyRouter.route("/")
.get((req, res) => {
    res.send(bounties)
})
.post((req, res) => {
    console.log(req.body);
    const newBounty = req.body;
    newBounty._id = uuidv4();
    bounties.push(newBounty);
    res.send(`Successfully added ${newBounty.name} to the database!`);
})

// Specific bounty handling
bountyRouter.route("/:bountyID")
.put((req, res) => {
    const bountyID = req.params.bountyID;
    const updatedBountyObject = req.body;
    const bountyIndex = bounties.findIndex(bounty => bounty._id === bountyID);
    Object.assign(bounties[bountyIndex], updatedBountyObject);
    res.send('Successfully changed bounty in the database!');
})
.delete((req, res) => {
    const bountyID = req.params.bountyID;
    const bountyIndex = bounties.findIndex(bounty => bounty._id === bountyID);
    bounties.splice(bountyIndex, 1);
    res.send('Successfully removed bounty from the database!')
})

module.exports = bountyRouter;
