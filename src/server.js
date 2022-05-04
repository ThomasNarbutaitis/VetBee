require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');
const petsRoutes = require('./routes');

const app = express();

// Middle ware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/', petsRoutes);

// api
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

app.listen(PORT, () => console.log('server is running on port', PORT));
