const express = require("express");
const router = new express.Router();
const Student = require("../models/students");

router.get("/", (req, res) => {
  res.send("Welcome to the STUDENT API");
});

// router.post("/student", (req, res) => {
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

router.post("/student", async (req, res) => {
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

router.get("/student", async (req, res) => {
  try {
    const studentsData = await Student.find();
    res.send(studentsData);
  } catch (error) {
    res.send(error);
  }
});

router.get("/student/:id", async (req, res) => {
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

router.delete("/student/:id", async (req, res) => {
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

module.exports = router;
