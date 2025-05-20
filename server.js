require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const errorHandler = require('./middleware/errorHandler');

const app = express();
connectDB();

app.get("/", (req, res) => res.send("Library API - CSE341 Project"));

app.use(express.json());
app.use('/books', bookRoutes);
app.use('/users', userRoutes);

// Centralized error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
