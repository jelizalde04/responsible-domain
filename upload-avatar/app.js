const express = require('express');
const cors = require('cors');
const avatarRoutes = require('./routes/avatarRoutes');
const swaggerUi = require('swagger-ui-express');
const { swaggerDocs } = require('./swagger');
const dotenv = require('dotenv');
const sequelize = require('./config/db');

dotenv.config();

const app = express();

// Configuración de CORS y JSON
app.use(cors());
app.use(express.json());

// Documentación Swagger
app.use('/api-docs-uploadAvatar', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas del microservicio de Avatar
app.use('/avatars', avatarRoutes);

// Función para iniciar el servidor
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa');

    await sequelize.sync({ force: false });
    console.log('Base de datos sincronizada');

    const PORT = process.env.PORT || 2006;
    app.listen(PORT, () => {
      console.log(`Avatar service running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Error al conectar o sincronizar con la base de datos:', error);
  }
};

// Llamar a la función para iniciar el servidor
startServer();
