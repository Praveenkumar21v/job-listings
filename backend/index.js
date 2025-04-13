const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const jobRoutes = require('./routes/jobs');

dotenv.config();

const app = express();

app.use(helmet());

app.use(morgan('combined'));

app.use(compression());

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected to database:', mongoose.connection.db.databaseName);
  })
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/jobs', jobRoutes);

app.get('/health', (req, res) => res.send('Backend is running'));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));