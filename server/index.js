require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const {
  register,
  login,
  logout,
  userSession
} = require("./controller/userCtrl");

const app = express();
app.use(express.json());

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

massive(CONNECTION_STRING).then(db => {
  console.log("database connected");
  app.set("db", db);
});

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14 //two weeks
    }
  })
);

// just a test
// app.get("/api/test", (req, res, next) => {
//   const db = req.app.get("db");
//   db.query("SELECT * FROM users;")
//     .then(users => {
//       res.status(200).send(users);
//     })
//     .catch(err => console.log(err));
// });

app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/auth/userSession", userSession);
app.delete("/auth/logout", logout);

app.get("/api/inventory", (req, res, next) => {
  const db = req.app.get("db");
  db.query("SELECT * FROM inventory;").then(inventory => {
    res.status(200).send(inventory);
  });
});

let port = SERVER_PORT || 4000;
app.listen(port, () => console.log(`server running on port ${port}`));

//add main and proxy to package.json
