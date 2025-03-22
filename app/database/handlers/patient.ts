"use server";
import Patient from "../models/Patient";
import bcrypt from "bcryptjs";

async function findOnePatient(data: object) {
  interface results {
    type: [unknown];
  }

  const results = await Patient.findOne(data);

  // Return a success message
  return JSON.stringify({
    msg: "Patients Found!!!",
    response: results,
    statusCode: 200,
  });
}

async function findPatients(data: object) {
  interface results {
    type: [unknown];
  }

  const results = await Patient.find(data);

  // Return a success message
  return JSON.stringify({
    msg: "Patients Found!!!",
    response: results,
    statusCode: 200,
  });
}

async function createPatient(data: { password: string }) {
  // Extract password from the data object
  const { password } = data;

  // Hash the password using bcrypt with a salt round of 10
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    // Create a new patient with the hashed password and other data
    await Patient.create({
      ...data,
      password: hashedPassword,
    });
    console.log("Patient Registered");

    // Return success message
    return "Signed Up Successfully";
  } catch (e) {
    // Log and return the error if patient creation fails
    console.log(e);
    return e;
  }
}

export { findOnePatient, findPatients, createPatient };
