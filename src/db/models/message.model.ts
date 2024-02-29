import { DataTypes, Model } from "sequelize"
import { IRoom, RoomTblName } from "./room.model"
import { IUser, UserTblName } from "./user.model"
import { sequelize } from "../services/db.service"
import { model_configs } from "../configs"

export type IMessage = {
    id: string,
    room_id: IRoom['id'],
    text: string,
    created_at: Date,
    created_by: IUser['id'],
    updated_at: Date
}

export type IMessageModel = Model<IMessage, IMessage>;

export const MessageTblName = 'Message';

export function init__Message(): void {
    sequelize.define<IMessageModel>(MessageTblName, {
        id: {
            type: DataTypes.STRING(50),
            primaryKey: true
        },
        room_id: {
            type: DataTypes.INTEGER,
            references: {
                model: RoomTblName,
                key: 'id'
            },
            allowNull: false
        },
        text: {
            type: DataTypes.STRING(5000),
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        created_by: {
            type: DataTypes.INTEGER,
            references: {
                model: UserTblName,
                key: 'id'
            },
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE
        }
    }, model_configs)
}
