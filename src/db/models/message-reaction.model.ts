import { DataTypes, Model, Sequelize } from "sequelize"
import { IUser, UserModel, UserTblName } from "./user.model"
import { IMessage, IMessageModel, MessageTblName } from "./message.model"
import { IReaction, ReactionModel, ReactionTblName } from "./reaction.model"
import { sequelize } from "../services/db.service"
import { model_configs } from "../configs"

export type IMessageReaction = {
    id: number,
    message_id: IMessage['id'],
    reaction_id: IReaction['id']
    created_by: IUser['id']
}

export type IMessageReactionModel = Model<IMessageReaction, IMessageReaction>;

export const MessageReactionTblName = 'MessageReaction';

export function init__MessageReaction(): void {
    sequelize.define<IMessageReactionModel>(MessageReactionTblName, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        message_id: {
            type: DataTypes.STRING(50),
            references: {
                model: MessageTblName,
                key: 'id'
            },
            allowNull: false
        },
        reaction_id: {
            type: DataTypes.INTEGER,
            references: {
                model: ReactionTblName,
                key: 'id'
            },
            allowNull: false
        },
        created_by: {
            type: DataTypes.INTEGER,
            references: {
                model: UserTblName,
                key: 'id'
            },
            allowNull: false
        }
    }, model_configs);
}