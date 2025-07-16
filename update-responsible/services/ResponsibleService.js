const Responsible = require("../models/Responsible");

const updateResponsible = async (id, { name, email, password, contact, avatar }) => {
  try {

    const responsible = await Responsible.findByPk(id);

    if (!responsible) {
      throw {
        status: 404,
        message: "Responsable no encontrado",
      };
    }

 
    if (email && email !== responsible.email) {
      const existingResponsible = await Responsible.findOne({ where: { email } });
      if (existingResponsible) {
        throw {
          status: 400,
          message: "Ya existe un responsable con este email.",
        };
      }
    }

  
    responsible.name = name || responsible.name;
    responsible.email = email || responsible.email;
    responsible.password = password || responsible.password;
    responsible.contact = contact || responsible.contact;
    responsible.avatar = avatar || responsible.avatar;

    await responsible.save();

    console.log(`Responsable actualizado: ${responsible.id}`);
    return responsible;
  } catch (error) {
    throw error; 
  }
};

module.exports = { updateResponsible };
