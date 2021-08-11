const express = require('express');
const app = express();
const path = require('path');

const apiRouter = require('./routes/api');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/build', express.static(path.join(__dirname, '../build')));


app.use('/api', apiRouter);

/*
In order to properly serve the build while using webpack-dev-server, it seems
as though this app.get to '/' MUST remain here within server.js...
which is fine I guess! Thus, any calls to update the data base (CRUD) can be made
via app.use('/api'). However, that does pose the question: how to trigger
components within React to update when making api calls?
 */
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.use((req, res) => res.status(404).send('Looks like you\'ve taken a right turn into the wrong place, bucko!'));

app.listen(3000); //listens on port 3000 -> http://localhost:3000/

module.exports = app;