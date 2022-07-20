import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sequelize } from './database';
import { routerLocaisReciclagem } from './routes/locaisReciclagem.routes';
import { createBDFAKE } from './fake/inicializa_BD';

const POST_URL = process.env.PORT || 3333

const app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// rotas
app.use(routerLocaisReciclagem)

app.listen(POST_URL, async () => {
  try {
    await sequelize.authenticate()
    sequelize.sync({ force: true })
    
    // create database fake
    setTimeout(() => {
      createBDFAKE()
    }, 2000)

    console.log("listening on port http://localhost:" + POST_URL);
  } catch (error) {
    console.log(error);
    
  }
})