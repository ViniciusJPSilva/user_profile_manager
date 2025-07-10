/**
 * Instância do Axios configurada com a URL base da API.
 *
 * @author Vinicius J P Silva
 */

import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default api;