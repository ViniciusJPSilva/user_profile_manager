/**
 * Arquivo principal da aplicação. Inicializa o servidor Express, configura middlewares e define rotas.
 *
 * @author Vinicius J P Silva
 */

require("dotenv").config();

const express = require("express");
const cors = require('cors');

const expressApp = express();
const port = process.env.PORT || 5000;

/**
 * Rota GET para verificar o status da API.
 */
expressApp.get('/status', (request, response) => {
    response.json({ "status": "API is running" });
});

// Middleware de CORS
expressApp.use(cors());

// Middleware para parse de JSON
expressApp.use(express.json());

// Rotas
const userRoute = require("./routes/user_route");
expressApp.use("/usuario", userRoute);

// Inicialização do servidor
expressApp.listen(port, () => {
    console.log(`Server is now running on port ${port}...`);
});