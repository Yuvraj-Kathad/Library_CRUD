const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// static uploads
app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOAD_DIR || 'uploads')));

// Routes
app.use('/api/students', require('./routes/students'));
app.use('/api/books', require('./routes/books'));
app.use('/api/library', require('./routes/library'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
