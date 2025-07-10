const express = require("express");
const router = express.Router();

const ConnectionFactory = require("../config/ConnectionFactory");
const UserDAO = require("../dao/UserDAO");
const User = require("../models/User");
const Address = require("../models/Address");

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

/**
 * Define os headers de resposta para permitir CORS.
 *
 * @param {express.Response} response - Objeto de resposta HTTP.
 * @returns {express.Response} Resposta com headers definidos.
 */
function setResponseHeader(response) {
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Max-Age", "1800");
    response.setHeader("Access-Control-Allow-Headers", "content-type");

    return response;
}

/**
 * Rota GET para obter o primeiro usuário registrado.
 */
router.get("/", async (request, response) => {
    console.log("User required");
    setResponseHeader(response);

    const userDAO = new UserDAO(new ConnectionFactory(dbConfig));
    const users = await userDAO.findAll();

    const responseJson = (users.length > 0) ? { status: "ok", user: users[0] } : { status: "na" };

    response.json(responseJson);
});

/**
 * Rota POST para atualizar os dados de um usuário existente.
 */
router.post("/", async(request, response) => {
    console.log("User updated");
    setResponseHeader(response);
    
    const user = request.body;

    if (!user || !user.name || !user.address) {
        return response.status(400).json({ error: "Incomplete user data." });
    }

    const userDAO = new UserDAO(new ConnectionFactory(dbConfig));

    updatedAddress = new Address(
        user.address.street, 
        user.address.number, 
        user.address.complement, 
        user.address.neighborhood, 
        user.address.city, 
        user.address.state, 
        user.address.zip_code, 
        user.address.id
    );

    updatedUser = new User(
        user.name, 
        new Date(user.birth_date), 
        updatedAddress, 
        user.biography, 
        user.profile_picture, 
        user.id
    );

    await userDAO.update(updatedUser);

    response.json({ status: "ok", user: updatedUser });
});

/**
 * Rota GET de verificação de status da rota 'usuario'.
 */
router.get("/status", (request, response) => {
    response.json({ "status": "Route 'usuario' is accessible" });
});

module.exports = router;