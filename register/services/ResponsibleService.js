const Responsible = require("../models/Responsible");

const createResponsible = async ({ name, email, password, contact, avatar }) => {  // Añadimos 'avatar'
  // Validamos que el nombre esté presente
  if (!name) {
    const error = new Error("El nombre del responsable es obligatorio.");
    error.status = 400;
    throw error;
  }

  // Validamos que el email esté presente
  if (!email) {
    const error = new Error("El email del responsable es obligatorio.");
    error.status = 400;
    throw error;
  }

  // Validamos que el password esté presente
  if (!password) {
    const error = new Error("La contraseña es obligatoria.");
    error.status = 400;
    throw error;
  }

  // Verificamos si ya existe un responsable con el mismo email
  const existingResponsible = await Responsible.findOne({ where: { email } });
  if (existingResponsible) {
    const error = new Error("Ya existe un responsable con este email.");
    error.status = 400;
    throw error;
  }

  // Creamos al responsable, incluyendo 'avatar'
  const responsible = await Responsible.create({
    name,
    email,
    password, // Recuerda encriptar la contraseña en un caso real
    contact,
    avatar,  // Guardamos el avatar en la base de datos
  });

  console.log(`Responsable creado exitosamente: ${responsible.id}`);
  return responsible;
};

module.exports = { createResponsible };
