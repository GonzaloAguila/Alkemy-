//Setup
const express = require("express")
const path = require("path")
const db = require("./db")
const morgan = require("morgan")
const routes = require("./routes")

//Custom use
const app = express()
const PORT = 3000

//Middlewares
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json({ extended: false}));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use("/api", routes);

//Bundle sender
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});

//Starting the API
db.sync({force: false}).then(() => {
    app.listen(3000,() => {
        console.log(`Listening on port ${PORT}`)
    })
})