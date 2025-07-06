class Address {

    constructor (street, number, neighborhood, city, state) {
        this.street = street;
        this.number = number;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
    }

    toString() {
        return `${this.street}, ${this.number}, ${this.neighborhood}, ${this.city} - ${this.state}`;
    }

}