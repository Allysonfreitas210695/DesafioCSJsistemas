import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { LocaisReciclagemServices } from "../services/LocaisReciclagemServices";
import { IRequestBodyLocaisReciclagem, IRequestParamLocaisReciclagem } from "../Types";


export class UpdateLocalReciclagem {
  async handle(req: Request<IRequestParamLocaisReciclagem, any, IRequestBodyLocaisReciclagem>, res: Response): Promise<void>{
    try {
      const { id } = req.params;

      const localreciclagemExiste = await LocaisReciclagemServices.findOne({
        where: {
          localReciclagem_id: Number(id)
        }
      })
      
      if(!localreciclagemExiste){
        res.status(StatusCodes.NOT_FOUND).json({error: "local reciclagem nao existe!"});
      }
  
      const updateLocal = await LocaisReciclagemServices.update(req.body, {
        where: {localReciclagem_id: Number(id)}
      });

      if(!updateLocal){
        res.status(StatusCodes.NOT_ACCEPTABLE).json({error: "local reciclagem nao existe!"});
      };

      res.status(StatusCodes.OK).json({sucess: "local reciclagem atualizado com sucesso"})
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}