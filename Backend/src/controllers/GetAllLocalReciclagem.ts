import axios from "axios";
import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { LocaisReciclagemServices } from "../services/LocaisReciclagemServices";
import { IRequestBodyLocaisReciclagem, IRequestParamLocaisReciclagem } from "../Types";

export class GetAllLocalReciclagem {
  async handle(req: Request<IRequestParamLocaisReciclagem, any, IRequestBodyLocaisReciclagem>, res: Response): Promise<void>{
    try {
      const findAll: any = await LocaisReciclagemServices.findAll();
      const newArray: any[] = [];

      for(let i = 0; i < findAll.length; i++) {
        const endereco = `
          ${findAll[i].logradouro ? `${findAll[i].logradouro}` : ""}
          ${findAll[i].bairro ? `,${findAll[i].bairro}` : ""}
          ${findAll[i].cidade ? `,${findAll[i].cidade}` : ""}
          ${findAll[i].cep ? `,${findAll[i].cep}` : ""}
        `
        const localizacao = await axios.get(`color sua chave aqui KEY`) 
        
        const { data } = localizacao;
        const { lat, lng } = data.results[0].geometry.location;
        newArray.push({...findAll[i].dataValues, lat, lng});
      }
        
      res.status(StatusCodes.OK).json(newArray);
      
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }
}