import type { Address } from "./Address";

export interface User {
    name: string;
    birth_date: string;
    address: Address;
    biography: string;
    image_url: string;
}
