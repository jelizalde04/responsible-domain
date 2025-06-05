const Responsible = require("../models/Responsible");

const updateResponsible = async (id, { name, email, password, contact }) => {
  // Buscamos al responsable por ID
  const responsible = await Responsible.findByPk(id);

  if (!responsible) {
    throw new Error("Responsable no encontrado");
  }

  // Validar si ya existe otro responsable con el mismo email
  if (email && email !== responsible.email) {
    const existingResponsible = await Responsible.findOne({ where: { email } });
    if (existingResponsible) {
      throw new Error("Ya existe un responsable con este email.");
    }
  }

  // Actualizamos el responsable con los nuevos datos
  responsible.name = name || responsible.name;
  responsible.email = email || responsible.email;
  responsible.password = password || responsible.password;
  responsible.contact = contact || responsible.contact;

  await responsible.save();

  console.log(`Responsable actualizado: ${responsible.id}`);
  return responsible;
};

module.exports = { updateResponsible };
