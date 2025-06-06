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

app.use('/api/responsibles', responsibleRoutes);
app.use('/api-docs-updateRes', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const PORT = process.env.PORT || 2002;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    await sequelize.sync({alter: true}); 
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to DB:', error);
  }
}

start();