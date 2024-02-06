import { DataTypes, Model, Sequelize } from "sequelize"
import { sequelize } from "../db.service"
import { model_configs } from "../configs";

export type IUser = {
    id: number,
    nickname: string,
    avatar?: string,
}

export type UserModel = Model<IUser, Omit<IUser, 'id'>>;

export const UserTblName = 'User';

export function init__User(): void {
    sequelize.define<UserModel>(UserTblName, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nickname: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false
        },
        avatar: {
            type: DataTypes.BLOB(),
            allowNull: true
        }
    }, model_configs)
}