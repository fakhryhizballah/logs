require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes');
const morgan = require('morgan');
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const uri = process.env.MONGO_URI;

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

// Routes
app.use('/api', routes);

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
