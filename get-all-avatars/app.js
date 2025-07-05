const express = require('express');
const cors = require('cors');
const avatarRoutes = require('./routes/avatarRoutes');
const swaggerUi = require('swagger-ui-express');
const { swaggerDocs } = require('./swagger');
const dotenv = require('dotenv');
const sequelize = require('./config/db');

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


app.use('/api-docs-getAvatar', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/avatars', avatarRoutes);
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Service is healthy' });
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa');

    await sequelize.sync({ force: false });
    console.log('Base de datos sincronizada');

    const PORT = process.env.PORT || 2009;
    app.listen(PORT, () => {
      console.log(`Avatar service running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Error al conectar o sincronizar con la base de datos:', error);
  }
};


startServer();
