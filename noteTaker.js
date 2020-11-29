// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3011;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Notes (DATA)
// =============================================================
var notesData = [{
        routeName: "notes",
        name: "Notes",
        input: "this is a sample note",
        id: "1"
    },
    {
        routeName: "home",
        name: "Home",
        input: "this is another sample note",
        id: "2"
    },
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Displays all notes
app.get("/api/notes", function (req, res) {
    fs.readFile("/db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        const savedNotes = JSON.parse(data);
        res.json(savedNotes);
    })
});


// Create New Notes - takes in JSON input
app.post("/api/notes", function (req, res) {
            const newNote = req.body;

            fs.readFile("./db/db.json", "utf8", function (err, data) {
                if (err) throw err;
                const savedNotes = JSON.parse(data);
                savedNotes.push(newNote);
                console.log(newNote);
                fs.writeFile("./db/db.json", JSON.stringify(savedNotes), function () {
                    console.log("Your note was saved");
                    return res.json(savedNotes);
                })
            });


            app.delete("/api/notes/:id", function (req, res) {

            });
            // Starts the server to begin listening
            // =============================================================
            app.listen(PORT, function () {
                console.log("App listening on PORT " + PORT);
            });