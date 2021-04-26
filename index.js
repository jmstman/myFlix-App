const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

// Invoke Morgan middleware function
app.use(morgan("common"));

// Serving static files
app.use(express.static("public"));

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to the myFlix App!");
});
app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.use((err, req, res, next) => {
  console.err(err.stack);
  res.status(500).send("Something went wrong, try again later!");
});

//GET request to have a list of ALL movies in the Databas
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
