const db = require('../models/appModels.js'); //used to deploy queries to ElephantDB

const appController = {};

// USER MIDDLEWARE

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
          _id : queryRes.rows[0]._id,
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

appController.updateRating = (req, res, next) => {
  // const query = `SELECT users._id, users.username, ratings._id AS ratingid, ratings.rating AS rating, songs.title AS title
  // FROM users
  // LEFT OUTER JOIN ratings ON ratings.userid = users._id
  // LEFT OUTER JOIN songs ON songs._id = songid
  // WHERE _id = $1 AND ratingid = $2`
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

appController.getUserRatings = (req, res, next) => {

  return next();
}

// SONG MIDDLEWARE

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

appController.getSongs = (req, res, next) => {

}

module.exports = appController;
