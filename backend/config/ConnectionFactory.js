const mysql = require("mysql2/promise");

const GET_CONN_ERROR_MESSAGE = "Unable to establish connection to database";
const END_CONN_ERROR_MESSAGE = "Error closing database connection";

/**
 * Fábrica para criação e encerramento de conexões com o banco de dados MySQL.
 *
 * @author Vinicius J P Silva
 */
class ConnectionFactory {

    /**
     * Cria uma instância de ConnectionFactory.
     *
     * @param {string} config - Configuração da conexão MySQL.
     */
    constructor (config) {
        this.config = config;
    }

    /**
     * Cria e retorna uma nova conexão com o banco de dados.
     *
     * @returns {Promise<mysql.Connection>} Conexão MySQL.
     */
    async getConnection() {
        try {
            const connection = await mysql.createConnection(this.config);
            return connection;
        } catch (error) {
            console.error(GET_CONN_ERROR_MESSAGE, error);
            throw error;
        }
    }

    /**
     * Encerra a conexão com o banco de dados.
     *
     * @param {Promise<mysql.Connection>} connection - Conexão a ser encerrada.
     * @returns {Promise<boolean>} True se encerrada com sucesso, false caso contrário.
     */
    async closeConnection(connection) {
        if (connection) {
            try {
                await connection.end();
                return true;
            } catch (error) {
                console.error(END_CONN_ERROR_MESSAGE, error);
                throw error;
            }
        }
        return false;
    }
}

module.exports = ConnectionFactory;