/**
 * Script de inicialização do banco de dados, criação de tabelas e inserção de dados de exemplo.
 * Executa a criação do banco, define as tabelas e insere um usuário fictício com endereço.
 *
 * @author Vinicius J P Silva
 */

require("dotenv").config();

const mysql = require("mysql2/promise");
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

/**
 * Cria o banco de dados se ele ainda não existir.
 */
async function createDatabase() {
    const connection = await mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
    console.log(`Database '${dbConfig.database}' created or already exists.`);
    await connection.end();
}

/**
 * Função principal que inicializa o banco, cria tabelas e insere dados iniciais.
 */
async function main() {
    try {
        await createDatabase();

        const connectionFactory = new ConnectionFactory(dbConfig);
        const userDAO = new UserDAO(connectionFactory);

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
        console.log("Tables created/verified successfully.");

        const myAddress = new Address(
            "Av. das Palmeiras",
            "1000",
            "Bloco A, Apt 305",
            "Vila Nova",
            "São Paulo",
            "SP",
            "04567001"
        );

        const myUser = new User(
            "Vinicius José Pires Silva",
            new Date("2000-06-16"),
            myAddress,
            "Fã do Robert Palmer, o cara mais estiloso que já passou pela Terra.",
            "https://avatars.githubusercontent.com/u/81810017"
        );

        const createdUser = await userDAO.create(myUser);
        console.log("User created successfully!");

    } catch (error) {
        console.error("Error creating database, tables or inserting data:", error);
    }
}

main();
