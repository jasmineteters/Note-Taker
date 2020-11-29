// Dependencies

const express = require("express");
const path = require("path");
const fs = require("fs");
const {
    nanoid
} = require("nanoid");

const app = express();
const PORT = process.env.PORT || 3011;

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        console.log(data);
        const savedNotes = JSON.parse(data);
        console.log(savedNotes);
        res.json(savedNotes);
    });
});

app.post("/api/notes", function (req, res) {
    const newNote = req.body;

    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        const savedNotes = JSON.parse(data);
        newNote.id = nanoid()
        savedNotes.push(newNote);
        console.log(newNote);
        fs.writeFile("db/db.json", JSON.stringify(savedNotes), function () {
            console.log("Your note was saved");
            return res.json(savedNotes);
        });
    });
});

app.delete("/api/notes/:id", function (req, res) {
    const deleteNote = req.params.id;

    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        const savedNotes = JSON.parse(data);
        const filteredArray = savedNotes.filter(function (note) {
            return note.id !== deleteNote;
        });
        console.log(filteredArray);
        fs.writeFile("db/db.json", JSON.stringify(filteredArray), function () {
            console.log("Your note was deleted");
            return res.json(filteredArray);
        });
    });
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});