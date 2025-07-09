const DataAccessObject = require("./DataAccessObject");
const AddressDAO = require("./AddressDAO");
const User = require("../models/User");
const Address = require("../models/Address");

const USER_TABLE_NAME = "users";
const INSERT_QUERY = (table) => `INSERT INTO ${table} (name, birthDate, biography, profilePicture, addressId) VALUES (?, ?, ?, ?, ?)`;
const FIND_BY_ID_QUERY = (table, addressTable) => `SELECT u.*, a.street, a.number, a.complement, a.neighborhood, a.city, a.state, a.zipCode FROM ${table} u LEFT JOIN ${addressTable} a ON u.addressId = a.id WHERE u.id = ?`;
const FIND_ALL_QUERY =(table, addressTable) => `SELECT u.*, a.street, a.number, a.complement, a.neighborhood, a.city, a.state, a.zipCode FROM ${table} u LEFT JOIN ${addressTable} a ON u.addressId = a.id`;
const UPDATE_QUERY = (table) => `UPDATE ${table} SET name = ?, birthDate = ?, biography = ?, profilePicture = ?, addressId = ? WHERE id = ?`; 
const DELETE_QUERY = (table) => `DELETE FROM ${table} WHERE id = ?`;

class UserDAO extends DataAccessObject {

    /**
     * Cria uma instância de UserDAO.
     *
     * @param {ConnectionFactory} connectionFactory - Fábrica de conexões com o banco de dados.
     */
    constructor (connectionFactory) {
        super(connectionFactory);
        this.tableName = USER_TABLE_NAME;
        this.addressDAO = new AddressDAO(connectionFactory);
    }

    async create(user) {
        const connection = await this.connectionFactory.getConnection();
        try {
            await connection.beginTransaction();

            if(user.address && !user.address.id) {
                const address = await this.addressDAO.create(user.address);
                user.address.id = address.id;
            }

            const [result] = await connection.execute(
                INSERT_QUERY(this.tableName), 
                [user.name, user.birthDate, user.biography, user.profilePicture, user.address ? user.address.id : null]
            );

            user.id = result.insertId;

            await connection.commit();
            return user;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            await this.connectionFactory.closeConnection(connection);
        }
    }

    async findById(id) {
        const connection = await this.connectionFactory.getConnection();

        try {
            const [rows] = await connection.execute(
                FIND_BY_ID_QUERY(this.tableName, this.addressDAO.tableName),
                [id]
            );

            return (rows.length === 0) ? null : this.mapUserFromRow(rows[0]);
        } finally {
            await this.connectionFactory.closeConnection(connection);
        }
    }

    async findAll() {
        const connection = await this.connectionFactory.getConnection();

        try {
            const [rows] = await connection.execute(
                FIND_ALL_QUERY(this.tableName, this.addressDAO.tableName)
            );

            return rows.map(userData => {
                return this.mapUserFromRow(userData);
            });
        } finally {
            await this.connectionFactory.closeConnection(connection);
        }
    }

    async update(user) {
        const connection = await this.connectionFactory.getConnection();

        try {
            await connection.beginTransaction();

            if (user.address) {
                if (user.address.id) {
                    await this.addressDAO.update(user.address);
                } else {
                    user.address.id = await this.addressDAO.create(user.address).id;
                }
            }

            const [resultUser] = await connection.execute(
                UPDATE_QUERY(this.tableName), 
                [user.name, user.birthDate, user.biography, user.profilePicture, user.address ? user.address.id : null, user.id]
            );

            await connection.commit();
            return resultUser.affectedRows > 0;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            await this.connectionFactory.closeConnection(connection);
        }
    }

    async delete (id) {
        const connection = await this.connectionFactory.getConnection();
        try {
            const [result] = await connection.execute(
                DELETE_QUERY(this.tableName), 
                [id]
            );
            return result.affectedRows > 0;
        } finally {
            await this.connectionFactory.closeConnection(connection);
        }
    }

    /**
     * Mapeia um objeto vindo do banco de dados para uma instância de User.
     *
     * @param {Object} userData - Linha retornada do banco de dados.
     * @returns {User} - Instância da classe User.
     */
    mapUserFromRow(userData) {
        const address = userData.addressId ? new Address(
            userData.street,
            userData.number,
            userData.complement,
            userData.neighborhood,
            userData.city,
            userData.state,
            userData.zipCode,
            userData.addressId
        ) : null;

        return new User(
            userData.name,
            new Date(userData.birthDate),
            address,
            userData.biography,
            userData.profilePicture,
            userData.id
        );
    }

}

module.exports = UserDAO;