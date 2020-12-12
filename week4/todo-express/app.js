const express = require('express');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Fake Database
const todos = [
    {
        name: "Do the laundry",
        description: "The basket is filling up quickly.",
        imageURL: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        completed: false,
        _id: uuidv4()
    }
];

// Base endpoint route handling

// General endpoint handling
app.route("/")
.get((req, res) => {
    res.send(todos);
})
.post((req, res) => {
    console.log(req.body);
    const newTodoItem = req.body;
    newTodoItem._id = uuidv4();
    todos.push(newTodoItem);
    res.send(`Successfully added ${newTodoItem.name} to the database!`);
})

// Specific endpoint handling with parameter
app.route("/:todoID")
.get((req, res) => {
    const todoID = req.params.todoID;
    const foundTodoItem = todos.find(todo => todo._id === todoID);
    console.log(foundTodoItem)
    res.send(foundTodoItem);
})
.put((req, res) => {
    const todoID = req.params.todoID;
    const updatedTodoObject = req.body;
    const todoItemIndex = todos.findIndex(todo => todo._id === todoID);
    Object.assign(todos[todoItemIndex], updatedTodoObject);
    res.send('Successfully changed todo in the database!');
})
.delete((req, res) => {
    const todoID = req.params.todoID;
    const todoItemIndex = todos.findIndex(todo => todo._id === todoID);
    todos.splice(todoItemIndex, 1);
    res.send('Successfully removed todo from the database!');
})

// Listen to port 9000
app.listen(9000, () => {
    console.log("Server listening to port 9000");
});
