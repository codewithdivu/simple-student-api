const { raw } = require("express");
const express = require("express");
require("./db/connection");

const app = express();
const port = process.env.PORT || 8000;

const Student = require("./models/students");
const studentRouter = require("./router/studentRouter");

app.use(express.json());
app.use(studentRouter);

app.listen(port, () => {
  console.log(`server is running in port ${port}.....`);
});

