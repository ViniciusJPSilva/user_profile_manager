/**
 * Interface que representa um usuário e seu endereço.
 *
 * @author Vinicius J P Silva
 */

export interface User {
    id: number
    name: string
    birth_date: string
    biography: string
    profile_picture: string
    address: {
        id: number
        street: string
        number: number
        complement: string
        neighborhood: string
        city: string
        state: string
        zip_code: string
    }
}
