// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;


var Reservations = [{
        "name": "Jeff Hardy",
        "phoneNumber": "919-683-3782",
        "Email": "Jeff.hardy@wwe.com",
        "UniqueID": 619
    },
    {
        "name": "Matte Hardy",
        "phoneNumber": "919-734-7823",
        "Email": "Mat.hardy@wwe.com",
        "UniqueID": 9125
    }
];
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));

// what reservations we have.
// html welcome page
// form page
// table page
// reservation

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "Sizzlin'.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});


app.get("/form", function(req, res) {
    res.sendFile(path.join(__dirname, "form.html"));
});
// Search for Specific Character (or all Reservations) - provides JSON
app.get("/api/:Reservations?", function(req, res) {
    var chosen = req.params.Reservations;

    // if (Reservations.length < 5) {
    //     console.log(Reservations);
    // } else {
    //     console.log(waiting);
    // }
    for (var i = 0; i < Reservations.length; i++) {
        if (chosen === Reservations[i].routeName) {
            return res.json(Reservations[i]);
        }
    }
    return res.json(Reservations);
});

// Create New Reservations - takes in JSON input
app.post("/form", function(req, res) {
    var newReservation = req.body;
    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

    console.log(newReservation);

    characters.push(newReservation);

    res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});