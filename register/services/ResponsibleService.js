const Responsible = require("../models/Responsible");

const createResponsible = async ({ name, email, password, contact, avatar }) => {  // Añadimos 'avatar'
 
  if (!name) {
    const error = new Error("El nombre del responsable es obligatorio.");
    error.status = 400;
    throw error;
  }


  if (!email) {
    const error = new Error("El email del responsable es obligatorio.");
    error.status = 400;
    throw error;
  }


  if (!password) {
    const error = new Error("La contraseña es obligatoria.");
    error.status = 400;
    throw error;
  }

  
  const existingResponsible = await Responsible.findOne({ where: { email } });
  if (existingResponsible) {
    const error = new Error("Ya existe un responsable con este email.");
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

  console.log(`Responsable creado exitosamente: ${responsible.id}`);
  return responsible;
};

module.exports = { createResponsible };
