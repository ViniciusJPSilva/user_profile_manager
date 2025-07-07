const ConnectionFactory = require("../config/ConnectionFactory");

const CREATE_ERROR = `The 'create' method must be implemented by subclasses.`;
const FIND_BY_ID_ERROR = `The 'findById' method must be implemented by subclasses.`;
const FIND_ALL_ERROR = `The 'findAll' method must be implemented by subclasses.`;
const UPDATE_ERROR = `The 'update' method must be implemented by subclasses.`;
const DELETE_ERROR = `The 'delete' method must be implemented by subclasses.`;

/**
 * Classe base para objetos de acesso a dados (DAO), define a interface para operações CRUD.
 *
 * @author Vinicius J P Silva
 */
class DataAccessObject {

    /**
     * Cria uma instância de DataAccessObject.
     *
     * @param {ConnectionFactory} connectionFactory - Fábrica de conexões com o banco de dados.
     */
    constructor (connectionFactory) {
        this.connectionFactory = connectionFactory;
    }

    /**
     * Cria uma nova entidade no banco de dados.
     *
     * @param {Object} entity - Entidade a ser criada.
     * @throws {Error} Método não implementado.
     */
    async create(entity) {
        throw new Error(CREATE_ERROR);
    }

    /**
     * Busca uma entidade pelo ID.
     *
     * @param {number} id - ID da entidade.
     * @throws {Error} Método não implementado.
     */
    async findById(id) {
        throw new Error(FIND_BY_ID_ERROR);
    }

    /**
     * Retorna todas as entidades.
     *
     * @throws {Error} Método não implementado.
     */
    async findAll() {
        throw new Error(FIND_ALL_ERROR);
    }

    /**
     * Atualiza uma entidade existente.
     *
     * @param {Object} entity - Entidade a ser atualizada.
     * @throws {Error} Método não implementado.
     */
    async update(entity) {
        throw new Error(UPDATE_ERROR);
    }

    /**
     * Remove uma entidade pelo ID.
     *
     * @param {number} id - ID da entidade.
     * @throws {Error} Método não implementado.
     */
    async delete (id) {
        throw new Error(DELETE_ERROR);
    }

}

module.exports = DataAccessObject;