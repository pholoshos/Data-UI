const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const path = require('path');
require("dotenv/config");
const jwt = require("jsonwebtoken");
const http = require("http");
const app = express();
const server = http.createServer(app);

const auth = (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1].toString();
  try {
    const secretKey = process.env.secret_key;
    const decoded = jwt?.verify(token, secretKey);
    req.id = decoded._id;
    req.schoolId = decoded.schoolId;

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

const port = 3000;

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const renderRouter = require("./routes/render");
app.use("/" ,renderRouter);

app.use(express.static(path.join(__dirname, 'public')));

//routes
//ss
// app.get("/", (req, res) => {
//   res.send("home page");
// });

// const options = { };

// mongoose.connect(process.env.DB_CONNECTION, {
//   ...options,
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once("open", () => {
//   console.log("Connected to the MongoDB database");
// });

server.listen(port, () => {
  console.log("listening on *:3000");
});


