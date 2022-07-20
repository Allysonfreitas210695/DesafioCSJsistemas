import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../database";

type ILocaisReciclagem = {
  localReciclagem_id: Number;
  identificacao: String;
  cep: String;
  logradouro: String;
  numeroEndereco: String;
  complemento: String;
  bairro: String;
  cidade: String;
  capacidade: Number;
}

type CreateLocalReciclagemType = Optional<ILocaisReciclagem, "localReciclagem_id">

const LocaisReciclagem: ModelDefined<ILocaisReciclagem, CreateLocalReciclagemType> = sequelize.define("LocaisReciclagens", {
  localReciclagem_id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  identificacao: {
    type: DataTypes.STRING
  },
  cep: {
    type: DataTypes.STRING
  },
  logradouro: {
    type: DataTypes.STRING
  },
  numeroEndereco: {
    type: DataTypes.STRING
  },
  complemento: {
    type: DataTypes.STRING
  },
  bairro: {
    type: DataTypes.STRING
  },
  cidade: {
    type: DataTypes.STRING
  },
  capacidade: {
    type: DataTypes.FLOAT
  }
})

export { LocaisReciclagem }