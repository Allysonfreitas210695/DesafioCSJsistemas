import { LocaisReciclagemServices } from "../services/LocaisReciclagemServices";
import { removeAcentos } from "../utils";
import { dbFake } from "./dbFake";

export function createBDFAKE(){
  dbFake.map(async (local) => {
    const dados = local
    try {
      
         const locaisReciclagemExiste = await LocaisReciclagemServices.findOne({
          where: {
            identificacao: dados.identificacao
          }
         })

      if(!locaisReciclagemExiste){
        await LocaisReciclagemServices.create({
        identificacao: removeAcentos(dados.identificacao),
        cep: removeAcentos(dados.cep || ""),
        logradouro: removeAcentos(dados.logradouro || ""),
        numeroEndereco: removeAcentos(dados.numeroEndereco || ""),
        bairro: removeAcentos(dados.bairro),
        capacidade: dados.capacidade,
        cidade: removeAcentos(dados.cidade),
        complemento: removeAcentos(dados.complemento || "") ,
        })
      }
    } catch (error) {
      console.log(error);
    }
  })
}