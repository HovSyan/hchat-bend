import { DataTypes, Model, Sequelize } from "sequelize"
import { sequelize } from "../db.service"
import { model_configs } from "../configs";

export type IUser = {
    id: number,
    nickname: string
}

export type UserModel = Model<IUser, IUser>;

export const UserTblName = 'User';

export function init__User(): void {
    sequelize.define<UserModel>(UserTblName, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrementIdentity: true
        },
        nickname: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, model_configs)
}