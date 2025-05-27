require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');
const session = require('express-session');
const passport = require('passport');

const app = express();
app.use(express.json());
connectDB();

// Express session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => res.send("Library API - CSE341 Project"));
app.use('/login', (req, res) => res.send('Login with GitHub'));
app.use('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
app.use('/books', bookRoutes);
app.use('/users', userRoutes);

// Centralized error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
