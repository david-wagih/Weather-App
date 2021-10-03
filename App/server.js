// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup our Server
const port = 4000;
const hostname = "127.0.0.1";
app.listen(port, listening);

function listening() {
    console.log(`Server running at https://${hostname}:${port}/`);
}

// make a get route here.
app.get("/all", sendData);

function sendData(req, res) {
    res.status(200).send(projectData);
}

// make a post route here.

app.post("/add", addData);

function addData(req, res) {
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
}