const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const models = require("./models.js");

const movies = models.Movie;
const users = models.User;
const genres = models.Genre;
const directors = models.Director;
const app = express();

app.use(bodyParser.json());

//mongoose.connect
mongoose.set("useFindAndModify", false);
mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
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

//GET request for all users
app.get("/users", (req, res) => {
  users
    .find()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(error => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//GET request about a user by username
app.get("/users/:Username", (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//GET request for ALL movies
app.get("/movies", (req, res) => {
  movies
    .find()
    .then(movies => {
      res.status(201).json(movies);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//GET request about a movie by Title
app.get("/movies/:Title", (req, res) => {
  movies
    .findOne({ Title: req.params.Title })
    .then(movies => {
      res.status(201).json(movies);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//GET request about all Genres
app.get("/genres", (req, res) => {
  genres
    .find()
    .then(genres => {
      res.status(201).json(genres);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//GET request about a genre by name
app.get("genres/:Name", (req, res) => {
  genres
    .findOne({ Name: req.params.Name })
    .then(genres => {
      res.status(201).json(genres);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Get request for ALL directors
app.get("/directors", (req, res) => {
  directors
    .find()
    .then(directors => {
      res.status(201).json(directors);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Get request about a specific Director by name
app.get("/directors/:Name", (req, res) => {
  directors
    .findOne({ Name: req.params.Name })
    .then(directors => {
      res.status(201).json(directors);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//POST request to create a new user
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then(user => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then(user => {
            res.status(201).json(user);
          })
          .catch(error => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//PUT request to update an existing user
app.put("/users/:Username", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//POST request to add a movie (by movieID) to a user's favorite movie list.
app.post("/users/:Username/Movies/:MovieID", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});
//DELETE request to delete a user (by username)
app.delete("/users/:Username", (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then(user => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//DELETE request to remove a movie (by movieID) from a user's favorite movie list.
app.delete("/users/:username/Favorites/:MovieID", (req, res) => {
  users.findOneAndUpdate(
    { Username: req.params.Username },
    { $pull: { FavoriteMovies: req.params.MovieID } },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong, please try again later!");
});

//GET request to have a list of ALL movies in the Database
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
