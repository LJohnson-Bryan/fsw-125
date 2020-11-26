const express = require("express");
const app = express();

app.listen(9000, () => {
    console.log("The server has been started on port 9000.")
});

// Fake database of games
const games = [
    {
        title: "MineCraft",
        type: "Open World",
        created: 2009
    },
    {
        title: "Apex Legends",
        type: "Battle Royale",
        created: 2019
    },
    {
        title: "Call of Duty: Cold War",
        type: "FPS",
        created: 2020
    },
    {
        title: "No Man's Sky",
        type: "Open World",
        created: 2016
    },
    {
        title: "Counter-Strike: Global Offensive",
        type: "FPS",
        created: 2012
    }
];

// Fake database of controllers
const controllers = [
    {
        title: "PS4 Controller",
        type: "DUALSHOCK 4",
        created: 2013
    },
    {
        title: "PS3 Controller",
        type: "DUALSHOCK 3",
        created: 2008
    },
    {
        title: "PS2 Controller (v2)",
        type: "DUALSHOCK 2",
        created: 2000
    },
    {
        title: "PS2 Controller (v1)",
        type: "DUALSHOCK",
        created: 1997
    },
    {
        title: "Keyboard",
        type: "Querty",
        created: 1874
    },
    {
        title: "Mouse",
        type: "standard",
        created: 1964
    }
]

// Fake database of game companies
const gameCompanies = [
    {
        title: "Mojang",
        popularGame: "MineCraft",
        founded: 2009
    },
    {
        title: "Treyarch",
        popularGame: "Call of Duty",
        founded: 1996 
    },
    {
        title: "Nintendo",
        popularGame: "Mario",
        founded: 1889
    }
]


// Endpoints for games and types
app.get('/games', (req, res) => {
    res.send(games);
});

app.get(`/games/fps`, (req, res) => {
    res.send(games.filter(item => item.type === "FPS"));
});

app.get(`/games/battle-royale`, (req, res) => {
    res.send(games.filter(item => item.type === "Battle Royale"));
});

app.get(`/games/open-world`, (req, res) => {
    res.send(games.filter(item => item.type === "Open World"));
});

app.get('/controllers', (req, res) => {
    res.send(controllers);
});

const dualShockControllers = controllers.filter(item => {
    if (item.type.includes("DUALSHOCK"))
    return(item);
});

app.get(`/controllers/dualshock`, (req, res) => {
    res.send(dualShockControllers);
});

const computerController = controllers.filter(item => {
    if(item.title === "Mouse" || item.title === "Keyboard")
    return item;
});

app.get(`/controllers/computer`, (req, res) => {
    res.send(computerController);
});

app.get(`/companies`, (req, res) => {
    res.send(gameCompanies);
});
