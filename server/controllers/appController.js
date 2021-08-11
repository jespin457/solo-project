const db = require('../models/appModels.js'); //used to deploy queries to ElephantDB

const appController = {};

// USER MIDDLEWARE

/*Registers users on the main page*/
appController.addUser = (req, res, next) => {
  const query = `INSERT INTO users (username, email)
  VALUES ($1, $2) RETURNING *`

  const values = [req.body.username, req.body.email];

  async function insertUser() {
    await db.query(query, values, (err, queryRes) => {
      // res.locals.added = queryRes.rows[0];
      if (err) {
        console.log('Error occured within addUser!');
        return next(err);
      }
      res.locals.added = queryRes.rows[0];
      return next();
    });
  }

  insertUser();
}

/*Signs users in if their credentials are within the database*/
appController.loginUser = (req, res, next) => {
  const query = `SELECT * FROM users
  WHERE username = $1 AND email = $2`

  const values = [req.body.username, req.body.email];

  async function attemptLogin() {
    await db.query(query, values, (err, queryRes) => {
      if (err) {
        console.log('Error occured within loginUser!');
        return next(err);
      }

      if (queryRes.rows[0]) {
        res.locals.loginStatus = 
        {
          userFound : true,
          _id : queryRes.rows[0]._id, //we retrieve the user_id here! Be aware of this!
          username : queryRes.rows[0].username,
          email : queryRes.rows[0].email,
        } 
        return next();
      };

      res.locals.loginStatus = {userFound : false};
      return next();
    });
  }

  attemptLogin();
}

// RATING MIDDLEWARE

/*Adds a rating with the user's id attached. Should only be accessible
if the user is already signed in. In all likelihood, we will keep the
user's _id within a cookie.*/
appController.addRating = (req, res, next) => {
  const query = `INSERT INTO ratings (rating, userId, songId)
  VALUES ($1, $2, $3) RETURNING *`

  const values = [req.body.rating, req.body.userId, req.body.songId];

  async function insertRating() {
    await db.query(query, values, (err, queryRes) => {
      if (err) {
        console.log('Error occured within addRating!');
        return next(err);
      }
      res.locals.added = queryRes.rows[0];
      return next();
    });
  }

  insertRating();
}

/*Updates a rating that has been selected by the user. The simplest
implementation is just to allow the user to see all their ratings along
with the associated rating_id. That way it's up to them to select which
rating to update.*/
appController.updateRating = (req, res, next) => {
  const query = `UPDATE ratings
  SET rating = $1
  WHERE _id = $2
  RETURNING *`

  const values = [req.body.newRating, req.body.ratingid];

  async function patchRating() {
    await db.query(query, values, (err, queryRes) => {
      if (err) {
        console.log('Error occured within updateRating!');
        res.locals.patchStatus = { didUpdate : false };
        return next(err);
      }

      if (!queryRes.rows[0]) {
        res.locals.patchStatus = { didUpdate : false };
        return next();
      }

      res.locals.patchStatus = { didUpdate : true };
      return next();
    });
  }

  patchRating();
}

/*Should work very similarly to addRating. The user will specify which
rating_id it is they would like to delete.*/
appController.deleteRating = (req, res, next) => {
  const query = `DELETE FROM ratings
  WHERE _id = $1
  RETURNING *`

  const values = [req.body.ratingId];

  async function removeRating() {
    await db.query(query, values, (err, queryRes) => {
      if (err) {
        console.log('Error occured within deleteRating!');
        res.locals.removeStatus = { didDelete : false };
        return next(err);
      }

      if (!queryRes.rows[0]) {
        res.locals.deleteStatus = { didDelete : false };
        return next();
      }

      res.locals.deleteStatus = { didDelete : true };
      return next();
    });
  }

  removeRating();
}

/*Should occur when the user logs in. Will retrieve all ratings that have
userid matched up with the user's _id.*/
appController.getUserRatings = (req, res, next) => {
  const query = `SELECT users._id, users.username, ratings._id AS rating_id, ratings.rating AS your_Rating, songs.title AS song_title, songs.artist AS artist
  FROM users
  LEFT OUTER JOIN ratings ON ratings.userid = users._id
  LEFT OUTER JOIN songs ON songs._id = songid
  WHERE users._id = $1`

  const values = [req.body.userId]; //will probably store user _id inside a cookie for easy access

  async function getMyRatings() {
    await db.query(query, values, (err, queryRes) => {
      if (err) {
        console.log('Error occured within getUserRatings!');
        return next(err);
      }

      res.locals.myRatings = queryRes.rows;
      return next();
    });
  }
  
  getMyRatings();
}

// SONG MIDDLEWARE

/*Should only accessible to users that are already logged in.
No need to access cookies here--we're making a whole new song to rate,
after all.*/
appController.addSong = (req, res, next) => {
  const query = `INSERT INTO songs (title, artist, releaseYear)
  VALUES ($1, $2, $3) RETURNING *`

  const values = [req.body.title, req.body.artist, req.body.releaseYear];

  async function insertSong() {
    await db.query(query, values, (err, queryRes) => {
      if (err) {
        console.log('Error occured within addSong!');
        return next(err);
      }
      res.locals.added = queryRes.rows[0];
      return next();
    });
  }

  insertSong();
}

/*Should occur after login. Will catalog to the user all
songs availble for rating.*/
appController.getSongs = (req, res, next) => {
  const query = `SELECT * FROM songs`

  async function retrSongs() {
    await db.query(query, null, (err, queryRes) => {
      if (err) {
        console.log('Error occured within getSongs!');
        return next(err);
      }

      res.locals.songs = queryRes.rows; //returns array of song objects
      return next();
    });
  }

  retrSongs();
}

module.exports = appController;
