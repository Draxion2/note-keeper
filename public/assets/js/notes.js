const fs = require("fs");
const path = require("path");
const notes = require("../../../db/db.json");

function findById(id, notesArray) {
    const result = notesArray.filter((notesArray) => notesArray.id === id)[0];
    return result;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, "../../../db/db.json"),
        JSON.stringify({notes: notesArray}, null, 2)
    );
    return note;
}

function deleteNote(body, notesArray) {
    const note = body;
    notesArray.pop(note);
    fs.writeFileSync(
        path.join(__dirname, "../../../db/db.json"),
        JSON.stringify({notes: notesArray}, null, 2)
    )
    return note;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== "string") {
        return false;
    }
    if (!note.text || typeof note.text !== "string") {
        return false;
    }
    return true;
}

module.exports = {
    findById,
    createNewNote,
    deleteNote,
    validateNote
};