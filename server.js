const fs = require("fs");
const path = require("path");
const express = require ("express");
const app = express();

// connect the note functions
const { findById, createNewNote, deleteNote, validateNote } = require("./public/assets/js/notes");

// connect to PORT
const PORT = process.env.PORT || 3001;

// connect to json file
const { notes }  = require("./db/db.json");

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// GET all notes
app.get("/api/notes", (req, res) => {
    let results = notes;
    res.json(results);
});

// POST a note
app.post("/api/notes", (req, res) => {
    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send("The note is missing some fields");
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

// DELETE a note
app.delete("/api/notes/:id", (req, res) => {
    const note = deleteNote(req.body, notes);
    res.json(note);
});

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