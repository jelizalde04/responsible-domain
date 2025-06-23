require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const responsibleRoutes = require('./routes/responsibleRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/responsibles', responsibleRoutes);
app.use('/api-docs-updateRes', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



sequelize.authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida correctamente");
    return sequelize.sync();
  })
  .then(() => {
    console.log("Modelos sincronizados con la base de datos");

    const PORT = process.env.PORT || 2002;
    app.listen(PORT, () => {
      console.log(`Servicio de actualización de responsables corriendo en puerto ${PORT}`);
    });
  })
  .catch(error => {
    console.error("Error al iniciar el servicio:", error);
    process.exit(1);
  });

module.exports = app;
