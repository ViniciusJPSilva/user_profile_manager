class User {

    constructor (id, name, birthDate, address, biography) {
        this.id = id;
        this.name = name;
        this.birthDate = this.birthDate;
        this.address = address;
        this.biography = biography;
    }

    getAge() {
        const today = new Date();
        let userAge = today.getFullYear() - this.birthDate.getFullYear();
        
        const monthCheck = today.getMonth() - this.birthDate.getMonth();
        const dayCheck = today.getDate() - this.birthDate.getDate();
                
        return (monthCheck < 0 || (monthCheck === 0 && dayCheck < 0)) ? --userAge : userAge;
    }

    toString() {
        const formatedBirthDate = this.birthDate.toLocaleDateString();
        return `User: ${this.name} \n Birth Date: ${formatedBirthDate} \n Address: ${this.address.toString()} \n Biography: ${this.biography}`;
    }
}