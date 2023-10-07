import { DataTypes, Model, Sequelize } from "sequelize"
import { sequelize } from "../db.service";
import { model_configs } from "../configs";

export type IReaction = {
    id: number,
    name: string
}

export type ReactionModel = Model<IReaction, IReaction>;

export const ReactionTblName = 'Reaction';

export function init__Reaction(): void {
    sequelize.define('Reaction', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrementIdentity: true
        },
        name: {
            type: DataTypes.STRING(25),
            allowNull: false
        }
    }, model_configs)
}
