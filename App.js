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

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
mongoose.connect(CONNECTION_STRING);

console.log(process.env.MONGO_CONNECTION_STRING);
console.log(process.env.NETLIFY_URL);
console.log(process.env.REMOTE_SERVER);

const app = express();

// Correctly setting up CORS to handle multiple origins
app.use(
  cors({
    credentials: true,
    origin: [process.env.NETLIFY_URL || "http://localhost:3000", "http://localhost:3001"], // Array of allowed origins
  })
); // Make sure CORS is used right after creating the app

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

app.use(session(sessionOptions));

app.use(express.json());

UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
Hello(app);
Lab5(app);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
