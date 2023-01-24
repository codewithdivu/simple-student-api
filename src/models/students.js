const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 3,
  },
  email: {
    type: String,
    require: true,
    unique: [true, "Email is already present"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("invalid email.....");
      }
    },
  },
  phone: {
    type: Number,
    min: 2,
    max: 10,
    require: true,
    unique: [true, "there is already exists a number"],
  },
  address: {
    type: String,
    require: true,
  },
});

// we will create new collection

const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;
