/**
 * Interface que representa a resposta da API de endereço (CEP).
 *
 * @author Vinicius J P Silva
 */

export interface AddressApi {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}