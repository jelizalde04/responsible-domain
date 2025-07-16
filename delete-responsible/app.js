const express = require('express');
const cors = require('cors');
const { petDb, responsibleDb } = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const responsibleRoutes = require('./routes/responsibleRoutes');

const app = express();
const PORT = process.env.PORT || 2005;


app.use(cors());
app.use(express.json());


app.use('/responsibles', responsibleRoutes);
app.use('/api-docs-deleteRes', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Service is healthy' });
});

async function startServer() {
  try {
   
    await petDb.authenticate();
    console.log('✅ Conexión exitosa a la base de datos de mascotas.');

    
    await responsibleDb.authenticate();
    console.log('✅ Conexión exitosa a la base de datos de responsables.');

   
    await petDb.sync({ alter: true });  
    await responsibleDb.sync({ alter: true });
    console.log('🔄 Bases de datos sincronizadas.');

    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });

  } catch (err) {
    console.error('❌ Error al conectar o sincronizar las bases de datos:');
    console.error(err);
    process.exit(1);
  }
}

startServer();
