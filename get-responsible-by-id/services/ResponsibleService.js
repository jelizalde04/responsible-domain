const Responsible = require("../models/Responsible");

const getResponsibleById = async (id) => {
  const responsible = await Responsible.findByPk(id);  

  return responsible;  
};

module.exports = { getResponsibleById };
