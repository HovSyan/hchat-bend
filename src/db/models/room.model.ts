import { DataTypes, Model, Sequelize } from "sequelize"
import { sequelize } from "../db.service";
import { model_configs } from "../configs";

export type IRoom = {
    id: number,
    name: string
}

export type RoomModel = Model<IRoom, Omit<IRoom, 'id'>>;

export const RoomTblName = 'Room';

export function init__Room(): void {
    sequelize.define<RoomModel>(RoomTblName, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, model_configs);
}
