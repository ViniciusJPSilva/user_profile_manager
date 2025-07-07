const DataAccessObject = require("./DataAccessObject");

const ADDRESS_TABLE_NAME = "addresses";
const INSERT_QUERY = (table) => `INSERT INTO ${table} (street, number, complement, neighborhood, city, state, zipCode) VALUES (?, ?, ?, ?, ?, ?, ?)`;

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
                `SELECT * FROM ${this.tableName} WHERE id = ?`, 
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
                `SELECT * FROM ${this.tableName}`
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
                `UPDATE ${this.tableName} SET street = ?, number = ?, complement = ?, neighborhood = ?, city = ?, state = ?, zipCode = ? WHERE id = ?`, 
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
                `DELETE FROM ${this.tableName} WHERE id = ?`, 
                [id]
            );
            return result.affectedRows > 0;
        } finally {
            await this.connectionFactory.closeConnection(connection);
        }
    }
}

module.exports = AddressDAO;
