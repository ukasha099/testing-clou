require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');

// Validate required environment variables
const requiredEnvVars = [
  'DB_HOST',
  'DB_PORT',
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD',
  'JWT_SECRET'
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingEnvVars.forEach(varName => {
    console.error(`   - ${varName}`);
  });
  console.error('\n💡 Please create a .env file in the backend directory.');
  console.error('   You can copy .env.example as a template:');
  console.error('   cp .env.example .env');
  process.exit(1);
}

// Check if JWT_SECRET is still the default placeholder
if (process.env.JWT_SECRET === 'your-secret-key-change-in-production') {
  console.warn('⚠️  WARNING: JWT_SECRET is still set to the default placeholder!');
  console.warn('   Please change it to a strong random string in your .env file.');
  console.warn('   This is a security risk in production!\n');
}

const app = express();
const PORT = process.env.PORT || 5000;

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'PERN Stack API Documentation',
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     description: Returns server status and timestamp
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthCheck'
 */
// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Function to create database if it doesn't exist
const createDatabaseIfNotExists = async () => {
  // Connect to default PostgreSQL database to check/create our database
  const adminSequelize = new Sequelize(
    'postgres', // Connect to default 'postgres' database
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 5432,
      dialect: 'postgres',
      logging: false,
    }
  );

  try {
    await adminSequelize.authenticate();
    console.log('Connected to PostgreSQL server.');

    // Check if database exists
    const [results] = await adminSequelize.query(
      `SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_NAME}'`
    );

    if (results.length === 0) {
      // Database doesn't exist, create it
      console.log(`Database "${process.env.DB_NAME}" does not exist. Creating...`);
      await adminSequelize.query(`CREATE DATABASE "${process.env.DB_NAME}"`);
      console.log(`✅ Database "${process.env.DB_NAME}" created successfully.`);
    } else {
      console.log(`✅ Database "${process.env.DB_NAME}" already exists.`);
    }

    await adminSequelize.close();
  } catch (error) {
    console.error('Error checking/creating database:', error.message);
    await adminSequelize.close();
    throw error;
  }
};

// Start server
const startServer = async () => {
  try {
    // Create database if it doesn't exist
    await createDatabaseIfNotExists();

    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Sync models (creates tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized.');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use!`);
        console.error(`   Another server is running on port ${PORT}.`);
        console.error(`\n💡 Solutions:`);
        console.error(`   1. Stop the other server (Ctrl+C in that terminal)`);
        console.error(`   2. Or change PORT in .env file to a different port`);
        console.error(`   3. Or kill the process using: Get-Process -Id <PID> | Stop-Process`);
        process.exit(1);
      } else {
        throw err;
      }
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();
