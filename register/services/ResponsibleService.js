const Responsible = require("../models/Responsible");

const createResponsible = async ({ name, email, password, contact, avatar }) => {
  if (!name) {
    const error = new Error("Name is required.");
    error.status = 400;
    throw error;
  }

  if (!email) {
    const error = new Error("Email is required.");
    error.status = 400;
    throw error;
  }

  if (!password) {
    const error = new Error("Password is required.");
    error.status = 400;
    throw error;
  }

  const existingResponsible = await Responsible.findOne({ where: { email } });
  if (existingResponsible) {
    const error = new Error("This email is already registered.");
    error.status = 400;
    throw error;
  }

  const responsible = await Responsible.create({
    name,
    email,
    password,
    contact,
    avatar,
  });

  console.log(`Responsible created: ${responsible.id}`);
  return responsible;
};

module.exports = { createResponsible };
