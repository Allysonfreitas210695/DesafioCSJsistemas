import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { LocaisReciclagemServices } from "../services/LocaisReciclagemServices";
import { IRequestBodyLocaisReciclagem, IRequestParamLocaisReciclagem } from "../Types";


export class CreateLocalReciclagem {
  async handle(req: Request<IRequestParamLocaisReciclagem, any, IRequestBodyLocaisReciclagem>, res: Response){
    try {
      const {} = req.body;
      const create = await LocaisReciclagemServices.create({...req.body});
      res.status(StatusCodes.CREATED).json(create);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}