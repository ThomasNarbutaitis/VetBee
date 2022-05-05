require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');
const { petsRoutes } = require('../routes/petsRoutes');
const { medicationsRoutes } = require('../routes/medications');
const { logsRoutes } = require('../routes/logsRoutes');
const { prescriptions } = require('../routes/prescriptionsRoutes');

const app = express();

// Middle ware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/v1', petsRoutes);
app.use('/v1', medicationsRoutes);
app.use('/v1', logsRoutes);
app.use('/v1', prescriptions);

// api
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

app.listen(PORT, () => console.log('server is running on port', PORT));
