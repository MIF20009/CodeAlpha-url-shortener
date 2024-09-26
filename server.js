// Importing
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const path = require("path");

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/url-shortener-database")
    .then(() => console.log("MongoDB connected ..."))
    .catch( err => console.error("MongoDB connection error: ",err));


// Parse JSON 
app.use(express.json());

// Static files 
app.use(express.static(path.join(__dirname)));

// Use routes 
app.use("/api", routes);

// Start server
const PORT = process.env.PORT || 3000 ; 
app.listen( PORT , () => console.log("Server is running on http://localhost:${PORT}"));
