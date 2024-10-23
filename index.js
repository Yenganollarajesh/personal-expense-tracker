
//index.js
const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
const categoryRoutes = require('./routes/categories');
const auth = require('./middleware/auth');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api',auth, transactionRoutes);
app.use('/api', auth,categoryRoutes);

sequelize.sync().then(() => {
  console.log('Database connected and models synced');
  app.listen(3000, () => console.log('Server running on port 3000'));
});
