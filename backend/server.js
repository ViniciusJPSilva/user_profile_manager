require("dotenv").config();

const express = require("express");
const expressApp = express();
const port = process.env.PORT || 5000;

// Root
expressApp.get('/test', (request, response) => {
    response.send("<center><h2>Server is online!</h2></center>");
});

// Routes
const userRoute = require("./routes/user_route");
expressApp.use("/usuario", userRoute);

// Start
expressApp.listen(port, () => {
    console.log(`Server is now running on port ${port}...`);
});