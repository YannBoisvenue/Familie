const express = require("express");
const cors = require("cors");
const sha256 = require("sha256");
const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const bodyParser = require("body-parser");
const url = "mongodb://admin:password1@ds119930.mlab.com:19930/finalproject";

let dbs = undefined;
MongoClient.connect(url, { useNewUrlParser: true }, (err, allDbs) => {
  dbs = allDbs;
});

let app = express();
let multer = require("multer");
app.use(cors());

let upload = multer({ dest: __dirname + "/images/" });
app.use(express.static(__dirname + "/images"));

app.post("/addProfile", upload.single("profilePicture"), (req, res) => {
  let extension = req.file.originalname.split(".").pop();
  fs.rename(req.file.path, req.file.path + "." + extension, () => {});
  let profile = req.body;
  profile = { ...profile, fileName: req.file.path + "." + extension };
  let db = dbs.db("finalproject");
  db.collection("profiles").insertOne(profile, (err, ress) => {
    if (err) throw err;
    let response = {
      success: true,
      message: "Profile successfully created",
      _id: ress._id
    };
    res.send(JSON.stringify(response));
  });
});

app.post("/addevent", upload.single("eventPicture"), (req, res) => {
  let extension = req.file.originalname.split(".").pop();
  fs.rename(req.file.path, req.file.path + "." + extension, () => {});
  let event = req.body;
  event = { ...event, fileName: req.file.path + "." + extension };
  let db = dbs.db("finalproject");
  db.collection("events").insertOne(event, (err, ress) => {
    if (err) throw err;
    let response = {
      success: true,
      message: "Event successfully inserted"
    };
    res.send(JSON.stringify(response));
  });
});

app.post("/add-family", upload.single("kidsPicture"), (req, res) => {
  let fileName = "";
  if (req.file) {
    let extension = req.file.originalname.split(".").pop();
    fs.rename(req.file.path, req.file.path + "." + extension, () => {});
    fileName = req.file.path + "." + extension;
  }
  let kidInfo = JSON.parse(req.body.kidsInfo.toString());
  let profile = req.body;
  profile = { ...profile, fileName: fileName };
  let db = dbs.db("finalproject");
  db.collection("profiles").updateOne(
    { userId: profile.userId },
    {
      $set: {
        family: {
          childPicture: profile.fileName,
          kidsInfo: kidInfo,
          otherParentId: profile.otherParentId
        }
      }
    }
  );
  let response = {
    success: true,
    message: "Family successfuly added"
  };
  res.send(JSON.stringify(response));
});
app.use(bodyParser.raw({ type: "*/*" }));
app.use((req, res, next) => {
  try {
    req.body = JSON.parse(req.body.toString());
    next();
  } catch (error) {
    next();
  }
});

app.post("/getProfile", (req, res) => {
  const id = req.body;
  let db = dbs.db("finalproject");
  db.collection("profiles").findOne({ userId: id }, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result) {
      res.send(
        JSON.stringify({
          success: true,
          result: result
        })
      );
    } else {
      res.send(JSON.stringify({ success: false }));
    }
  });
});

app.post("/signup", (req, res) => {
  let db = dbs.db("finalproject");
  db.collection("users").findOne(
    { username: req.body.username },
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result) {
        res.send(JSON.stringify({ success: false }));
      } else {
        let user = {
          username: req.body.username,
          password: sha256(req.body.password)
        };
        db.collection("users").insertOne(user, err => {
          if (err) return res.status(500).send(err);
          db.collection("users").findOne(
            { username: req.body.username },
            (err, result) => {
              if (err) return res.status(500).send(err);
              res.send(
                JSON.stringify({
                  success: true,
                  user: {
                    userId: result._id
                  }
                })
              );
            }
          );
        });
      }
    }
  );
});

app.post("/login", (req, res) => {
  let db = dbs.db("finalproject");
  db.collection("users").findOne(
    { username: req.body.username },
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result) {
        if (result.password === sha256(req.body.password)) {
          res.send(
            JSON.stringify({
              success: true,
              user: {
                userId: result._id,
                username: result.username,
                location: result.location
              }
            })
          );
        } else {
          res.send(JSON.stringify({ success: false }));
        }
      } else {
        res.send(JSON.stringify({ success: false }));
      }
    }
  );
});

app.get("/allEvents", (req, res) => {
  let db = dbs.db("finalproject");
  db.collection("events")
    .find({})
    .toArray(function(err, result) {
      if (err) throw err;
      let response = {
        success: true,
        events: result
      };
      res.send(JSON.stringify(response));
    });
});

app.post("/attendingEvents", (req, res) => {
  let event = req.body;
  let db = dbs.db("finalproject");
  let user = event.user;
  db.collection("events")
    .find({
      guests: user
    })
    .toArray(function(err, result) {
      if (err) throw err;
      let response = {
        success: true,
        events: result
      };
      res.send(JSON.stringify(response));
    });
});

app.post("/hostingEvents", (req, res) => {
  let db = dbs.db("finalproject");
  let user = req.body;
  db.collection("events")
    .find({
      userId: user
    })
    .toArray(function(err, result) {
      if (err) throw err;
      let response = {
        success: true,
        attending: result
      };
      res.send(JSON.stringify(response));
    });
});

app.get("/event/:id", (req, res) => {
  const id = req.params.id;
  let db = dbs.db("finalproject");
  db.collection("events")
    .find({ _id: ObjectID(id) })
    .toArray((err, array) => {
      if (err) throw err;
      let response = {
        success: true,
        result: array[0]
      };
      res.send(JSON.stringify(response));
    });
});

app.get("/profile/:id", (req, res) => {
  const id = req.params.id;
  let db = dbs.db("finalproject");
  db.collection("profiles")
    .find({ _id: ObjectID(id) })
    .toArray((err, array) => {
      if (err) throw err;
      let response = {
        success: true,
        result: array[0]
      };
      res.send(JSON.stringify(response));
    });
});

app.post("/attendEvent", (req, res) => {
  let db = dbs.db("finalproject");
  let request = req.body;
  let user = request.user;
  let chosenEvent = request.eventId;
  let bob = [];
  db.collection("events").findOne({ _id: ObjectID(chosenEvent) }, function(
    err,
    result
  ) {
    if (err) throw err;
    if (result.guests) bob = result.guests;
    bob.push(user);
    db.collection("events").updateOne(
      { _id: ObjectID(chosenEvent) },
      { $set: { guests: bob } }
    );
    res.send(JSON.stringify({ success: true }));
  });
});

app.post("/unattendEvent", (req, res) => {
  let db = dbs.db("finalproject");
  let userId = req.body.user;
  let chosenEvent = req.body.eventId;
  let guestsArray = [];
  db.collection("events").findOne({ _id: ObjectID(chosenEvent) }, function(
    err,
    result
  ) {
    if (err) throw err;
    if (result.guests) {
      guestsArray = result.guests;
    }
    while (guestsArray.indexOf(userId) !== -1) {
      guestsArray.splice(guestsArray.indexOf(userId), 1);
    }
    db.collection("events").updateOne(
      { _id: ObjectID(chosenEvent) },
      { $set: { guests: guestsArray } }
    );
    res.send(JSON.stringify({ success: true }));
  });
});

app.get("/all-parents", (req, res) => {
  let db = dbs.db("finalproject");
  db.collection("profiles")
    .find({})
    .toArray(function(err, result) {
      if (err) throw err;
      let response = {
        success: true,
        parents: result
      };
      res.send(JSON.stringify(response));
    });
});

app.post("/deleteEvent", (req, res) => {
  let db = dbs.db("finalproject");
  db.collection("events").deleteOne({ _id: ObjectID(req.body) }, function(
    err,
    result
  ) {
    res.send(JSON.stringify({ success: result.acknowledged }));
  });
});

app.listen(4000, function() {
  console.log("Server started on port 4000");
});
