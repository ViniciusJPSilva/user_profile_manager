export interface User {
    id: string
    name: string
    email: string
    birth_date: string
    biography: string
    profile_picture: string
    address: {
        street: string
        number: string
        complement: string
        neighborhood: string
        city: string
        state: string
        zip_code: string
    }
}
