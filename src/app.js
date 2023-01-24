const { raw } = require("express");
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

app.get("/student", async (req, res) => {
  try {
    const studentsData = await Student.find();
    res.send(studentsData);
  } catch (error) {
    res.send(error);
  }
});

app.get("/student/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const studentData = await Student.findById(_id);
    console.log("studentData", studentData);

    if (!studentData) {
      res.status(404).send();
    } else {
      res.send(studentData);
    }
  } catch (error) {
    res.send(error);
  }
});

app.delete("/student/:id", async (req, res) => {
  try {
    const deleteStudent = await Student.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      res.status(400).send();
    } else {
      res.send(deleteStudent);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log(`server is running in port ${port}.....`);
});
