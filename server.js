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

const app = express();

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
  })
);
app.use(express.json());

// Session configuration
app.use(
  session({
    name: "library.sid",
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

// Session validation middleware
app.use((req, res, next) => {
  // Allow GET requests and authentication flow without validation
  if (
    req.method === "GET" ||
    req.path === "/login" ||
    req.path === "/github/callback" ||
    req.path === "/api-docs"
  ) {
    return next();
  }

  // Validate session for write operations (POST/PUT/DELETE)
  if (req.sessionID) {
    req.sessionStore.get(req.sessionID, (err, session) => {
      if (err || !session) {
        res.clearCookie("library.sid");
        return res.status(401).json({
          success: false,
          message: "Session expired - Please log in"
        });
      }

      if (!session.passport?.user) {
        res.clearCookie("library.sid");
        return res.status(401).json({
          success: false,
          message: "Invalid session - Please reauthenticate"
        });
      }

      req.session.touch();
      next();
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Authentication required for this operation"
    });
  }
});

// Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", require("./routes/auth"));
app.use("/books", require("./routes/books"));
app.use("/members", require("./routes/members"));

app.get("/", (req, res) => res.send("Library API - CSE341 Project"));

// Error handling
app.use(require("./middleware/errorHandler"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
