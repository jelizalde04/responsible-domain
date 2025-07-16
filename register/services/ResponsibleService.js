const Responsible = require("../models/Responsible");

const createResponsible = async ({
  name,
  email,
  password,
  contact,
  avatar,
}) => {
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
