const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db')

app.use(cors());
app.use(express.json());
fs.readdirSync(path.join(__dirname, 'routes')).forEach(file => {
  const route = require(`./routes/${file}`);
  app.use('/api', route);
});
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});