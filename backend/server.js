// server for final project
const express = require("express");
const cors = require("cors");
const sha256 = require("sha256");
const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const bodyParser = require("body-parser");
const url = "mongodb://admin:password1@ds119930.mlab.com:19930/finalproject";
// const fs = require("fs");

let dbs = undefined;
MongoClient.connect(url, { useNewUrlParser: true }, (err, allDbs) => {
  dbs = allDbs;
});
//the { useNewUrlParser: true }, bit is only to remove the parse error we continually get

let app = express();
app.use(cors());
app.use(bodyParser.raw({ type: "*/*" }));

// this parse everything received. not usefull right now
// app.use((req, res, next) => {
//   try {
//     req.body = JSON.parse(req.body.toString());
//     next();
//   } catch (error) {
//     next();
//   }
// });

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
        db.collection("users").insertOne(user, (err, result) => {
          if (err) {
            if (err) return res.status(500).send(err);
          }
        });
        res.send(JSON.stringify({ success: true }));
      }
    }
  );
});

/******** Login *********/

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//EVENTS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// events should have 7 components:
// 1- the Image
// 2-the name of the event
// 3-the time ( day, month, year)
// 4-coordinate (i'm guessing coodinates)
// 5-guests : list of all users attending the event
// 6- description : a text description of the event
// 7- creator: the user who created the event

//{"name":"Bearded park walkie!","time":"23,02,2019","location":"1515 rue de mencon, a Bruti, j2h 4u8","coordinate":{"lat":40.741895,"lon":-73.989308},"guests":["Bob"],"description":"who does not like beards???","creator":"Vincent"}

app.post("/addevent", (req, res) => {
  console.log("req.body", req.body.toString());
  let event = JSON.parse(req.body);
  console.log("event", event);
  let db = dbs.db("finalproject");

  //image to string and then to the database here

  // const fileType = req.body.pictureType;
  // const extension = fileType.substring(
  //   fileType.indexOf("/") + 1,
  //   fileType.length
  // );
  // let replaceBase64 = new RegExp(`^data:image\/${extension};base64,`);
  // var base64Data = req.body.picture.replace(replaceBase64, "");
  // var eventId = new ObjectID();
  // let fileName = `image_${eventId}.${extension}`;
  // let filePath = `${__dirname}/pictures/${fileName}`;

  // fs.writeFileSync(filePath, base64Data, "base64");

  // end of the input of the image in the db

  db.collection("events").insertOne(event, (err, ress) => {
    if (err) throw err;
    let response = {
      success: true,
      message: "Event successfully inserted"
    };
    res.send(JSON.stringify(response));
  });
});

app.get("/allEvents", (req, res) => {
  console.log("you made it to allEvents");
  let db = dbs.db("finalproject");
  db.collection("events")
    .find({})
    .toArray(function(err, result) {
      if (err) throw err;
      let response = {
        success: true,
        reviews: result
      };
      res.send(JSON.stringify(response));
      console.log("response", response);
      console.log("success at /allEvents!!!!!");
    });
});

app.post("/attendingEvents", (req, res) => {
  console.log("you made it to attendingEvents");
  let event = JSON.parse(req.body);
  console.log("event", event);
  let db = dbs.db("finalproject");
  let user = event.user;
  console.log("user", user);

  db.collection("events")
    .find({
      guests: user
    })
    .toArray(function(err, result) {
      if (err) throw err;
      let response = {
        success: true,
        reviews: result
      };
      res.send(JSON.stringify(response));
      console.log("response", response);
      console.log("success at /attendingEvents!!");
    });
});

app.post("/hostingEvents", (req, res) => {
  console.log("you made it to hostingEvents");
  let db = dbs.db("finalproject");
  let request = JSON.parse(req.body);
  let user = request.user;
  console.log("user", user);

  db.collection("events")
    .find({
      creator: user
    })
    .toArray(function(err, result) {
      if (err) throw err;
      let response = {
        success: true,
        attending: result
      };
      res.send(JSON.stringify(response));
      console.log("response", response);
      console.log("success at /hostingEvents!!!");
    });
});

app.post("/attendEvent", (req, res) => {
  console.log("you made it to attendEvent");
  let db = dbs.db("finalproject");
  let request = JSON.parse(req.body);
  let user = request.user;
  let chosenEvent = request.event;
  db.collection("events")
    .find({
      chosenEvent
    })
    .incertOne({ guests: event.guests + user }, (err, ress) => {
      if (err) throw err;
      let response = {
        message: "User successfully added to event"
      };
      res.send(JSON.stringify(response));
      console.log("response", response);
      console.log("success at /attendEvent!!!!!");
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PROFILE
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Profile should have 9 components:
// 1- the Image
// 2-firstName
// 3-lastName
// 4-sex
// 5-relationshipStatus
// 6- occupation
// 7- dateOfBirth
// 8- location
// 9- interest

//{"firstname":"bob","lastname":"Dabob","sex":"male","relationshipStatus":"single","occupation":"burocrat","dateOfBirth":"14,03,1974","location":"1 rue de mencon, a bruti","interest":"nose picking"}

app.post("/addProfile", (req, res) => {
  console.log("req.body", req.body.toString());
  let profile = JSON.parse(req.body);
  console.log("profiles", profile);
  let db = dbs.db("finalproject");

  //image to string and then to the database here

  // const fileType = req.body.pictureType;
  // const extension = fileType.substring(
  //   fileType.indexOf("/") + 1,
  //   fileType.length
  // );
  // let replaceBase64 = new RegExp(`^data:image\/${extension};base64,`);
  // var base64Data = req.body.picture.replace(replaceBase64, "");
  // var eventId = new ObjectID();
  // let fileName = `image_${eventId}.${extension}`;
  // let filePath = `${__dirname}/pictures/${fileName}`;

  // fs.writeFileSync(filePath, base64Data, "base64");

  // end of the input of the image in the db

  db.collection("profiles").insertOne(profile, (err, ress) => {
    if (err) throw err;
    let response = {
      success: true,
      message: "Profile successfully created"
    };
    res.send(JSON.stringify(response));
  });
});

app.listen(4000, function() {
  console.log("Server started on port 4000");
});
