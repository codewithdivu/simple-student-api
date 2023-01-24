const express = require("express");
const app = express();
require("./db/connection");

const Student = require("./models/students");

const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the STUDENT API");
});

// app.post("/student", (req, res) => {
//   console.log(req.body);
//   const user = new Student(req.body);

//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user);
//     })
//     .catch((e) => {
//       res.status(400).send(e);
//     });

//   res.send("hello from POST");
// });

app.post("/student", async (req, res) => {
  try {
    console.log("user", req.body);
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (error) {
    res.status(400).send(error);
  }

  res.send("hello from POST");
});

app.listen(port, () => {
  console.log(`server is running in port ${port}.....`);
});
