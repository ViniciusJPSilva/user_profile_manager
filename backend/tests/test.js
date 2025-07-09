require("dotenv").config();

const ConnectionFactory = require("../config/ConnectionFactory");
const UserDAO = require("../dao/UserDAO");
const AddressDAO = require("../dao/AddressDAO");
const User = require("../models/User");
const Address = require("../models/Address");

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

async function main() {
    const connectionFactory = new ConnectionFactory(dbConfig);
    const userDAO = new UserDAO(connectionFactory);

    try {
        const connection = await connectionFactory.getConnection();
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS addresses (
                id INT AUTO_INCREMENT PRIMARY KEY,
                street VARCHAR(255) NOT NULL,
                number VARCHAR(50),
                complement VARCHAR(255),
                neighborhood VARCHAR(255),
                city VARCHAR(255) NOT NULL,
                state VARCHAR(255) NOT NULL,
                zipCode VARCHAR(20)
            )
        `);
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                birthDate DATE,
                biography TEXT,
                profilePicture VARCHAR(255),
                addressId INT,
                FOREIGN KEY (addressId) REFERENCES addresses(id) ON DELETE SET NULL
            )
        `);
        await connectionFactory.closeConnection(connection);
        console.log("Tabelas verificadas/criadas com sucesso.");


        console.log("\n--- Criando um novo usuário com endereço ---");
        const address1 = new Address("Rua Teste", 12, "Casa B", "Colonia", "Barbacena", "Minas Gerais", "36201150");
        let newUser = new User("Vinicius Jose", new Date("2000-06-15"), address1, "Vagabundo Nato!", "https://eu.jpg");
        newUser = await userDAO.create(newUser);
        console.log("Usuário criado:", newUser);

        console.log("\n--- Buscando usuário por ID ---");
        const foundUser = await userDAO.findById(newUser.id);
        console.log("Usuário encontrado:", foundUser);

        console.log("\n--- Atualizando o endereço do usuário ---");
        foundUser.address.street = "Nova Rua";
        foundUser.address.number = "999";
        const updated = await userDAO.update(foundUser);
        console.log("Usuário atualizado:", updated ? "Sim" : "Não", foundUser);

        console.log("\n--- Buscando todos os usuários ---");
        const allUsers = await userDAO.findAll();
        console.log("Todos os usuários:", allUsers);

        console.log("\n--- Deletando usuário ---");
        const deleted = await userDAO.delete(1);
        console.log("Usuário deletado:", deleted ? "Sim" : "Não");

    } catch (error) {
        console.error("Ocorreu um erro na execução do exemplo:", error);
    }
}

main();