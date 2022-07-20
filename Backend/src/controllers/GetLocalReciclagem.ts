import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { LocaisReciclagemServices } from "../services/LocaisReciclagemServices";
import { IRequestBodyLocaisReciclagem, IRequestParamLocaisReciclagem } from "../Types";


export class GetLocalReciclagem {
  async handle(req: Request<IRequestParamLocaisReciclagem, any, IRequestBodyLocaisReciclagem>, res: Response): Promise<void>{
    try {
      const { id } = req.params;
      const getLocalreciclagem = await LocaisReciclagemServices.findOne({
        where: {localReciclagem_id: Number(id)}
      });

      if(!getLocalreciclagem){
        res.status(StatusCodes.NOT_FOUND).json({error: "localreciclagem nao existe"});
      }

      res.status(StatusCodes.OK).json(getLocalreciclagem);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}