import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { LocaisReciclagemServices } from "../services/LocaisReciclagemServices";
import { IRequestBodyLocaisReciclagem, IRequestParamLocaisReciclagem } from "../Types";


export class DeleteLocalReciclagem {
  async handle(req: Request<IRequestParamLocaisReciclagem, any, IRequestBodyLocaisReciclagem>, res: Response){
    try {
      const { id } = req.params;
      
      const localReciclagemExiste = await LocaisReciclagemServices.findOne({
        where: {
          localReciclagem_id: Number(id)
        }
      })
      
      if(!localReciclagemExiste){
        res.status(StatusCodes.NOT_ACCEPTABLE).json({error: "local reciclagem nao existe!"});
      }

      const create = await LocaisReciclagemServices.destroy({
        where: {
          localReciclagem_id: Number(id)
        }
      });

      if(!create){
        res.status(StatusCodes.NOT_ACCEPTABLE).json({error: "local reciclagem nao existe!"});
      }

      res.status(StatusCodes.OK).json({sucess: "local reciclagem deletado com sucesso"});
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}