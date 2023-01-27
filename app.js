const express = require("express");

const app = express();

app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 3000;
var items = ["Buy Food", "Cook Food", "Eat Food"];

app.set('view engine', 'ejs');


app.get("/", function(req, res) {
    var today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var day = today.toLocaleDateString("en-us", options);
    res.render("list", {dayName: day, itemsListName: items});
});

app.post("/", function(req, res) {
    var item = req.body.item;
    items.push(item);

    res.redirect("/");
});

app.listen(port, function() {
    console.log("Listening on port", port);
});