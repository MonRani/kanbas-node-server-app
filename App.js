import "dotenv/config";
import session from "express-session";
import express from "express";
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import cors from "cors";

// Connect to MongoDB without deprecated options
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
mongoose.connect(CONNECTION_STRING)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Debug logs for environment variables
console.log("Mongo Connection String:", process.env.MONGO_CONNECTION_STRING);
console.log("Netlify URL:", process.env.NETLIFY_URL);
console.log("Remote Server:", process.env.REMOTE_SERVER);

const app = express();

// CORS configuration
app.use(
  cors({
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
    origin: [
      process.env.NETLIFY_URL || "http://localhost:3000",
      "http://localhost:3001",
      "https://a6--kanbas-web-app-assignment.netlify.app",
      "https://a6--kanbas-react-web-app-assignment2.netlify.app"
    ], // Array of allowed origins
  })
);

// Session management configuration
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas", // Secret for session encryption
  resave: false, // Don't save session if it wasn't modified
  saveUninitialized: false, // Don't create session until something is stored
  cookie: {
    secure: process.env.NODE_ENV !== "development", // Secure cookies in production
    sameSite: process.env.NODE_ENV !== "development" ? "none" : "lax", // Lax in development, None in production
  },
};

// If not in development mode, apply additional security configurations
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true; // Trust reverse proxy (e.g., when behind a load balancer)
  sessionOptions.cookie.domain = process.env.NODE_SERVER_DOMAIN; // Set cookie domain for production
}

app.use(session(sessionOptions)); // Initialize session middleware
app.use(express.json()); // Middleware for parsing JSON bodies

// Register routes
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
Hello(app);
Lab5(app);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});