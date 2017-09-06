const express = require('express');
const models = require('./models');
const bodyParser = require('body-parser');
const AnimalController = require('./controllers/animal');
const UserController = require('./controllers/user');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const AnonymousStrategy = require('passport-anonymous').Strategy;

const app = express();
app.use(bodyParser.json());

passport.use(new AnonymousStrategy());
passport.use(new BasicStrategy(function (username, password, done) {
  console.log("AUTHTHASLKDJASLKDJASLKDJ");
  models.User.findOne({
    where: {
      username: username
    }
  }).then((user) => {
    console.log(user);
    if (!user) {
      return done(null, false);
    } else if (user.password !== password) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  }).catch((error) => {
    console.log(error);
  });
}));

app.get("/", passport.authenticate(['basic', 'anonymous'], {session: false}), UserController.detail);
app.post("/users", UserController.create);
app.get("/animals", passport.authenticate(['basic', 'anonymous'], {session: false}), AnimalController.list);
app.get("/animals/:id", AnimalController.detail);
app.post("/animals", AnimalController.create);
app.post("/animals/:id/adopt", passport.authenticate('basic', {session: false}), AnimalController.adopt);

app.listen(3000);
