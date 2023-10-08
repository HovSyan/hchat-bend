import { Sequelize } from "sequelize";
import { db_configs } from "./configs";

export const sequelize = new Sequelize(db_configs);