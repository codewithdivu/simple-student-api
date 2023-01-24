const express = require("express");
const app = express();
require("./db/connection");

const Student = require("./models/students");

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Welcome to the STUDENT API");
});

app.post("/student", (req, res) => {
  res.send("hello from POST");
});

app.listen(port, () => {
  console.log(`server is running in port ${port}.....`);
});
