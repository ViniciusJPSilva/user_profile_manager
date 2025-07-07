require("dotenv").config();

const express = require("express");
const expressApp = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

// Root
expressApp.get('/status', (request, response) => {
    response.json({ "status": "API is running" });
});

// Routes
const userRoute = require("./routes/user_route");
expressApp.use("/usuario", userRoute);

// Cors
expressApp.use(cors());

// Start
expressApp.listen(port, () => {
    console.log(`Server is now running on port ${port}...`);
});