const mongoose = require("mongoose");

// Movies Mongoose Schema
const movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
});

// Genres Mongoose Schema
const genreSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Description: { type: String, required: true }
});

// Users Mongoose Schema
const userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movies" }]
});

// Directors Mongoose Schema
const directorSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Bio: String,
  Birth: { type: Number, required: true },
  Death: Number,
  Movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movies" }]
});

const Movie = mongoose.model("Movie", movieSchema);
const User = mongoose.model("User", userSchema);
const Director = mongoose.model("Director", directorSchema);
const Genre = mongoose.model("Genre", genreSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Genre = Genre;
module.exports.Director = Director;
