import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { LocaisReciclagemServices } from "../services/LocaisReciclagemServices";
import { IRequestBodyLocaisReciclagem, IRequestParamLocaisReciclagem } from "../Types";

export class GetAllLocalReciclagem {
  async handle(req: Request<IRequestParamLocaisReciclagem, any, IRequestBodyLocaisReciclagem>, res: Response): Promise<void>{
    try {
      const getAllLocalReciclagem = await LocaisReciclagemServices.findAll();
      res.status(StatusCodes.OK).json(getAllLocalReciclagem);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }
}