import 

class User {

    constructor (id, name, birthDate, address, biography) {
        this.id = id;
        this.name = name;
        this.birthDate = this.birthDate;
        this.address = address;
        this.biography = biography;
    }

    getAge() {
        const TODAY = new Date();
        let userAge = TODAY.getFullYear() - this.birthDate.getFullYear();
        
        const MONTH_CHECK = TODAY.getMonth() - this.birthDate.getMonth();
        const DAY_CHECK = TODAY.getDate() - this.birthDate.getDate();
                
        return (MONTH_CHECK < 0 || (MONTH_CHECK === 0 && DAY_CHECK < 0)) ? --userAge : userAge;
    }

    toString() {
        const FORMATED_BIRTH_DATE = this.birthDate.toLocaleDateString();
        return `User: ${this.name} \n Birth Date: ${FORMATED_BIRTH_DATE} \n Address: ${this.address.toString()} \n Biography: ${this.biography}`;
    }
}