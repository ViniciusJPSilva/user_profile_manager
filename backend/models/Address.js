
/**
 * Classe que representa um endereço.
 * 
 * @author Vinicius J P Silva
 */
class Address {

    /**
     * Cria uma instância de Address.
     *
     * @param {string} street 
     * @param {number} number 
     * @param {string} complement 
     * @param {string} neighborhood 
     * @param {string} city 
     * @param {string} state 
     * @param {string} zipCode 
     * @param {number} [id] - ID opcional 
     */
    constructor (street, number, complement, neighborhood, city, state, zipCode, id = null) {
        this.street = street;
        this.number = number;
        this.complement = complement;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.id = id;
    }

    /**
     * Retorna o endereço formatado como string.
     *
     * @returns {string} Endereço completo em formato legível.
     */
    toString() {
        return `${this.street}, ${this.number}, ${this.complement}, ${this.neighborhood}, ${this.city} - ${this.state}, CEP: ${this.zipCode}`;
    }

    /**
     * Retorna o endereço no formato JSON.
     * @returns {Object} Objeto com os dados do endereço.
     */
    toJSON() {
        return {
            street: this.street,
            number: this.number,
            complement: this.complement,
            neighborhood: this.neighborhood,
            city: this.city,
            state: this.state,
            zip_code: this.zipCode,
        };
    }
}

module.exports = Address;