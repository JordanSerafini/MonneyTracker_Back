import express from "express";
import router from "./routes/routes";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 3000;

// Create express application
const app = express();

// CORS
const corsOptions = {
  origin: ["http://localhost:5173", "https://monney-tracker.netlify.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true 
};

app.use(cors(corsOptions));

// Setting the middleware to serve static files
app.use(express.static("public"));
app.use(express.static("node_modules"));


// Setting the middleware to manage POST data
// Middleware is a function that runs between the request and the response
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Routes settings
app.use("/", router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});