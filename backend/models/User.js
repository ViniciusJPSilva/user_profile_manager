const Address = require("../models/Address");

/**
 * Classe que representa um usuário.
 *
 * @author Vinicius J P Silva
 */
class User {

    /**
     * Cria uma instância de User.
     *
     * @param {number} [id] - ID opcional 
     * @param {string} name 
     * @param {Date} birthDate 
     * @param {Address} address 
     * @param {String} biography 
     * @param {String} profilePicture 
     */
    constructor (name, birthDate, address, biography, profilePicture, id = null) {
        this.id = id;
        this.name = name;
        this.birthDate = birthDate;
        this.address = address;
        this.biography = biography;
        this.profilePicture = profilePicture;
    }

    /**
     * Calcula a idade do usuário com base na data de nascimento.
     *
     * @returns {number} Idade atual do usuário.
     */
    getAge() {
        const today = new Date();
        let userAge = today.getFullYear() - this.birthDate.getFullYear();
        
        const monthCheck = today.getMonth() - this.birthDate.getMonth();
        const dayCheck = today.getDate() - this.birthDate.getDate();
                
        return (monthCheck < 0 || (monthCheck === 0 && dayCheck < 0)) ? --userAge : userAge;
    }

    /**
     * Retorna as informações do usuário formatadas como string.
     *
     * @returns {string} Dados do usuário em formato legível.
     */
    toString() {
        const formatedBirthDate = this.birthDate.toLocaleDateString();
        return `User: ${this.name} \n Birth Date: ${formatedBirthDate} \n Address: ${this.address.toString()} \n Biography: ${this.biography}`;
    }

    /**
     * Retorna os dados do usuário no formato JSON.
     *
     * @returns {Object} Objeto com os dados do usuário.
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            birthDate: this.birthDate.toISOString().split("T")[0],
            biography: this.biography,
            profilePicture: this.profilePicture,
            address: this.address ? this.address.toJSON() : null

        };
    }
}

module.exports = User;