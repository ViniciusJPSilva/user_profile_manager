require("dotenv").config();

const EXPRESS = require("express");
const APP = EXPRESS();
const PORT = process.env.PORT || 5000;


APP.get('/test', (request, response) => {
    response.send("<center><h2>Server is online!</h2></center>");
});

APP.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}...`);
});