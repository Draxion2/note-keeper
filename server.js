const fs = require("fs");
const path = require("path");
const express = require ("express");
const PORT = process.env.PORT || 3001;
const app = express();
const notes = require("./db/db.json");

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());
app.use(express.static("public"));

// connect to notes page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/note.html"));
});

// connect html file by default
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// connect the server!
app.listen(PORT, () => {
    console.log(`SERVER CONNECTED ON ${PORT}!`);
});