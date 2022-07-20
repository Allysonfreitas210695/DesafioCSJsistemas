import { LocaisReciclagemServices } from "../services/LocaisReciclagemServices";
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
        identificacao: dados.identificacao,
        cep: dados.cep || "",
        logradouro: dados.logradouro || "",
        numeroEndereco: dados.numeroEndereco || "",
        bairro: dados.bairro,
        capacidade: dados.capacidade,
        cidade: dados.cidade,
        complemento: dados.complemento || "",
        })
      }
    } catch (error) {
      console.log(error);
    }
  })
}