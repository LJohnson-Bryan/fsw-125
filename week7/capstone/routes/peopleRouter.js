const express = require('express');
const peopleRouter = express.Router();
const { v4: uuidv4 } = require('uuid');

// Static data to act like a database
const people = [
    {
        name: "Yoda",
        email: "Yoad@gmail.com",
        alive: true,
        image: "https://media.tag24.de/951x634/g/k/gkx9f0vsgerze0xxlxt7d3aj5chiykbp.jpg",
        favoriteThings: ["Shiny Objects", "The Force", "Eggs"],
        age: 50,
        _id: uuidv4()
    },
    {
        name: "Rick Sanchez",
        email: "mattzl@yahoo.com",
        alive: false,
        image: "https://observer.com/wp-content/uploads/sites/2/2020/06/rick-morty.jpg?quality=80",
        favoriteThings: ["Science", "Adventures", "Morty"],
        age: 24,
        _id: uuidv4()
    },
    {
        name: "Emily Suzy",
        email: "suzay@yahoo.com",
        alive: true,
        image: "https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        favoriteThings: ["Laptop", "Iphone 11", "Flowers"],
        age: 23,
        _id: uuidv4()
    },
    {
        name: "Jonas Kakaroto",
        email: "jkakaroto@yahoo.com",
        alive: true,
        image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        favoriteThings: ["Photography", "Drones", "Vacationing"],
        age: 34,
        _id: uuidv4()
    },
    {
        name: "Joseph Gonzalez",
        email: "miracletwentyone@bing.com",
        alive: true,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
        favoriteThings: ["Blogging", "Shopping", "Producing Music"],
        age: 27,
        _id: uuidv4()
    },
    {
        name: "Anelale Najera",
        email: "anelale@yahoo.com",
        alive: false,
        image: "https://images.unsplash.com/photo-1544132173-46e0a80d5d4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1955&q=80",
        favoriteThings: ["Knitting", "Grandchildren", "Magazines"],
        age: 83,
        _id: uuidv4()
    },
    {
        name: "Rafael Johnmal",
        email: "rafflejohn@gmail.com",
        alive: true,
        image: "https://images.unsplash.com/photo-1544819576-82e8d26e7d22?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
        favoriteThings: ["Newspaper", "Shopping", "Drones"],
        age: 76,
        _id: uuidv4()
    },
    {
        name: "Imansyah Muhamad",
        email: "imanyamp@gmail.com",
        alive: true,
        image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80",
        favoriteThings: ["Games", "Performing Arts", "Photography"],
        age: 18,
        _id: uuidv4()
    },
    {
        name: "Dinese Silvae",
        email: "dinae@gmail.com",
        alive: true,
        image: "https://images.unsplash.com/photo-1445633629932-0029acc44e88?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
        favoriteThings: ["Robby (Son)", "Performing Arts", "Shopping"],
        age: 28,
        _id: uuidv4()
    },
    {
        name: "Morty Smith",
        email: "mortmort@gmail.com",
        alive: true,
        image: "https://static.wikia.nocookie.net/rickandmorty/images/4/41/Morty_Smith.jpg/revision/latest/scale-to-width-down/310?cb=20200519152019",
        favoriteThings: ["Adventures", "Science", "Jessica"],
        age: 14,
        _id: uuidv4()
    },
    {
        name: "Summer Smith",
        email: "notMortySis@gmail.com",
        alive: true,
        image: "https://static.wikia.nocookie.net/rickandmorty/images/a/ad/Summer_is_cool.jpeg/revision/latest/scale-to-width-down/310?cb=20160919183158",
        favoriteThings: ["Phone", "Grandpa Rick", "Popularity"],
        age: 17,
        _id: uuidv4()
    },
    {
        name: "Luke Skywalker",
        email: "lukeSkyJedi@gmail.com",
        alive: true,
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Luke_Skywalker.png/220px-Luke_Skywalker.png",
        favoriteThings: ["The Force", "LightSabers", "Jedi Power"],
        age: 19,
        _id: uuidv4()
    }
];

// General Route Handling for "/people" -- with search and GET all
peopleRouter.route("/")
.get((req, res, next) => {
    if(req.query.s) {
        const results = people.filter(person => {
            if(person.name.toLowerCase().includes(req.query.s.toLocaleLowerCase())) { 
                return person 
            }
        });
        if(results.length === 0) {
            res.status(404);
            const error = new Error(`Error 404: Cannot find any matches with: ${req.query.s}.`);
            return next(error);
        } else {
            res.status(200).send(results);
        }
    } else {
        res.status(200).send(people)
    }
})
.post((req, res) => {
    const newThing = req.body;
    newThing._id = uuidv4();
    people.push(newThing);
    res.status(201).send(newThing);
})

peopleRouter.route("/:thingID")
.get((req, res, next) => {
    const thingID = req.params.thingID;
    const thingIndex = people.findIndex(thing => thing._id === thingID);
    if(thingIndex === -1) {
        res.status(500);
        const error = new Error(`Error 500: Cannot retrieve information for ID: ${req.params.thingID}.`);
        return next(error);
    } else {
        res.status(200).send(people[thingIndex]);
    }
})
.put((req, res) => {
    const thingID = req.params.thingID;
    const updatedThingObject = req.body;
    const thingIndex = people.findIndex(thing => thing._id === thingID);
    if(thingIndex === -1) {
        res.status(500);
        const error = new Error(`Error 500: Cannot retrieve information for ID: ${req.params.thingID}.`);
        return next(error);
    } else {
        Object.assign(people[thingIndex], updatedThingObject);
        res.status(200).send(people[thingIndex]);
    }
})
.delete((req, res) => {
    const thingID = req.params.thingID;
    const thingIndex = people.findIndex(thing => thing._id === thingID);
    if(thingIndex === -1) {
        res.status(500);
        const error = new Error(`Error 500: Cannot retrieve information for ID: ${req.params.thingID}.`);
        return next(error);
    } else {
        people.splice(thingIndex, 1);
        res.status(200).send('Successfully removed thing from the database!');
    }
})

module.exports = peopleRouter;
