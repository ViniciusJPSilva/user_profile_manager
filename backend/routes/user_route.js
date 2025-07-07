const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Address = require("../models/Address");

router.get("/", (request, response) => {
    const address = new Address("Rua Teste", 12, "Casa B", "Colonia", "Barbacena", "Minas Gerais", "36201150");
    const user = new User("Vinicius Jose", new Date("2000-06-15"), address, "Vagabundo Nato!", "");

    console.log("Usuário requisitado");

    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Max-Age", "1800");
    response.setHeader("Access-Control-Allow-Headers", "content-type");

    response.json({ user });
});

router.get("/status", (request, response) => {
    response.json({ "status": "Route 'usuario' is accessible" });
});

module.exports = router;