require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
const initializePassport = require("./config/auth");

// Create an Express application
const app = express();

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || "https://cse341-library-api.onrender.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

// Body parser middleware
app.use(express.json());

// Session configuration
app.use(
  session({
    name: "connect.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
      ttl: 24 * 60 * 60 // 24 hours session expiration
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours cookie expiration
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      httpOnly: true
    }
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

// Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", require("./routes/auth"));
app.use("/books", require("./routes/books"));
app.use("/members", require("./routes/members"));

// Health check route
app.get("/", (req, res) => res.send("Library API - CSE341 Project"));

// Error handling
app.use(require("./middleware/errorHandler"));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);