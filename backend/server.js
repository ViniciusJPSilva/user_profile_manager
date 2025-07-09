require("dotenv").config();

const express = require("express");
const cors = require('cors');

const expressApp = express();
const port = process.env.PORT || 5000;

// Root
expressApp.get('/status', (request, response) => {
    response.json({ "status": "API is running" });
});

// Cors
expressApp.use(cors());

// JSON
expressApp.use(express.json());

// Routes
const userRoute = require("./routes/user_route");
expressApp.use("/usuario", userRoute);

// Start
expressApp.listen(port, () => {
    console.log(`Server is now running on port ${port}...`);
});