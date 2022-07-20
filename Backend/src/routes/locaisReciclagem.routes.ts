import { Router } from "express";
import { CreateLocalReciclagem } from "../controllers/CreateLocalReciclagem";
import { DeleteLocalReciclagem } from "../controllers/DeleteLocalReciclagem";
import { GetAllLocalReciclagem } from "../controllers/GetAllLocalReciclagem";
import { GetLocalReciclagem } from "../controllers/GetLocalReciclagem";
import { UpdateLocalReciclagem } from "../controllers/UpdateLocalReciclagem";

const routerLocaisReciclagem = Router();

routerLocaisReciclagem.get('/locaisReciclagem/:id', new GetLocalReciclagem().handle);
routerLocaisReciclagem.get('/locaisReciclagem', new GetAllLocalReciclagem().handle);
routerLocaisReciclagem.post('/locaisReciclagem', new CreateLocalReciclagem().handle);
routerLocaisReciclagem.put('/locaisReciclagem/:id', new UpdateLocalReciclagem().handle);
routerLocaisReciclagem.delete('/locaisReciclagem/:id', new DeleteLocalReciclagem().handle);

export { routerLocaisReciclagem };