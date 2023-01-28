const express = require("express");
const datefns = require(__dirname + "/date.js");

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const port = process.env.PORT || 3000;

// Note: Though the arrays are being updated later in the file.
// they can be changed to const. This is one of the quirks of js.
// the const array variable cannot be assigned a completely new variable,
// but the things inside the array can still be changed.

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set('view engine', 'ejs');


app.get("/", function(req, res) {

    let date = datefns.getDay();

    res.render("list", {listName: date, itemsListName: items});
});

app.post("/", function(req, res) {
    let item = req.body.item;

    if(req.body.button === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req, res) {
    res.render("list", {listName: "Work List", itemsListName: workItems});
})

app.get("/about", function(req, res) {
    res.render("about")
})

app.listen(port, function() {
    console.log("Listening on port", port);
});





///////////////////////////////////////////

// The following post is not used right now.
// The action on the list.ejs posts to the "/" path and not to the "/work",
// However, a conditional logic has been added to the app.post("/"), that will check
// on which route the new item button button was pressed by tapping into the req.body.button
// property of the req, which tracks the value the submit button has.
// And the value of submit button has been set to equal to the "listName" variable.

// app.post("/work", function(req, res) {
//     let item = req.body.item;
//     workItems.push(item);

//     res.redirect("/work");
// })

//////////////////////////////////////////