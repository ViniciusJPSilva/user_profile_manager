const express = require('express');
const router = express.Router();

router.get("/", (request, response) => {
    response.send("Testing");
});

router.get("/test", (request, response) => {
    response.send("<center><h2>Route 'usuario' is accessible!</h2></center>");
});

module.exports = router;