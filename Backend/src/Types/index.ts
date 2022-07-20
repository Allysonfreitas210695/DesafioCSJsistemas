export type IRequestParamLocaisReciclagem = {
  id: String;
}

export type IRequestBodyLocaisReciclagem = {
  identificacao: String;
  cep: String;
  logradouro: String;
  numeroEndereco: String;
  complemento: String;
  bairro: String;
  cidade: String;
  capacidade: Number;
}