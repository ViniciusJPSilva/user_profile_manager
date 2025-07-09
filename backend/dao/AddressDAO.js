const DataAccessObject = require("./DataAccessObject");

const ADDRESS_TABLE_NAME = "addresses";

const INSERT_QUERY = (table) => `INSERT INTO ${table} (street, number, complement, neighborhood, city, state, zipCode) VALUES (?, ?, ?, ?, ?, ?, ?)`;
const FIND_BY_ID_QUERY = (table) => `SELECT * FROM ${table} WHERE id = ?`;
const FIND_ALL_QUERY = (table) => `SELECT * FROM ${table}`;
const UPDATE_QUERY = (table) => `UPDATE ${table} SET street = ?, number = ?, complement = ?, neighborhood = ?, city = ?, state = ?, zipCode = ? WHERE id = ?`; 
const DELETE_QUERY = (table) => `DELETE FROM ${table} WHERE id = ?`;

class AddressDAO extends DataAccessObject {
    constructor(connectionFactory) {
        super(connectionFactory);
        this.tableName = ADDRESS_TABLE_NAME;
    }

    async create(address) {
        const connection = await this.connectionFactory.getConnection();
        try {
            const [result] = await connection.execute(
                INSERT_QUERY(this.tableName), 
                [address.street, address.number, address.complement, address.neighborhood, address.city, address.state, address.zipCode]
            );
            address.id = result.insertId;
            return address;
        } finally {
            await this.connectionFactory.closeConnection(connection);
        }
    }

    async findById(id) {
        const connection = await this.connectionFactory.getConnection();
        try {
            const [rows] = await connection.execute(
                FIND_BY_ID_QUERY(this.tableName), 
                [id]
            );
            return rows[0];
        } finally {
            await this.connectionFactory.closeConnection(connection);
        }
    }

    async findAll() {
        const connection = await this.connectionFactory.getConnection();
        try {
            const [rows] = await connection.execute(
                FIND_ALL_QUERY(this.tableName)
            );
            return rows;
        } finally {
            await this.connectionFactory.closeConnection(connection);
        }
    }

    async update(address) {
        const connection = await this.connectionFactory.getConnection();
        try {
            const [result] = await connection.execute(
                UPDATE_QUERY(this.tableName), 
                [address.street, address.number, address.complement, address.neighborhood, address.city, address.state, address.zipCode, address.id]
            );
            return result.affectedRows > 0;
        } finally {
            await this.connectionFactory.closeConnection(connection);
        }
    }

    async delete(id) {
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
}

module.exports = AddressDAO;
