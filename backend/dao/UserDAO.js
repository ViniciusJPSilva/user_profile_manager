const DataAccessObject = require("./DataAccessObject");

const USER_TABLE_NAME = "users";
const INSERT_QUERY = (table) => `INSERT INTO ${table} (name, email) VALUES (?, ?)`;

class UserDAO extends DataAccessObject {

    /**
     * Cria uma instância de UserDAO.
     *
     * @param {ConnectionFactory} connectionFactory - Fábrica de conexões com o banco de dados.
     */
    constructor (connectionFactory) {
        super(connectionFactory);
        this.tableName = USER_TABLE_NAME;
    }

    async create(entity) {
        const connection = await this.connectionFactory.getConnection();
        try {
            const [result] = await connection.execute(
                `INSERT INTO ${this.tableName} (name, birthDate, biography, profilePicture, addressId) VALUES (?, ?, ?, ?, ?)`, 
                [user.name, user.birthDate, user.biography, user.profilePicture, user.address.id]
            );
            user.id = result.insertId;
            return user;
        } finally {
            await this.connectionFactory.closeConnection(connection);
        }
    }

    async findById(id) {
        throw new Error(FIND_BY_ID_ERROR);
    }

    async findAll() {
        throw new Error(FIND_ALL_ERROR);
    }

    async update(entity) {
        throw new Error(UPDATE_ERROR);
    }

    async delete (id) {
        throw new Error(DELETE_ERROR);
    }

}

module.exports = UserDAO;