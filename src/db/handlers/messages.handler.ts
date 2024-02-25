import { IMessageModel, MessageTblName } from "../models/message.model";
import { RoomModel, RoomTblName } from "../models/room.model";
import { sequelize } from "../services";

export class MessagesHandler {
    async getByRoomId(room_id: number, offset: number, limit: number): Promise<IMessageModel[] | null> {
        const messages = await sequelize.models[MessageTblName].findAll<IMessageModel>({ where: { room_id }, offset, limit });

        if (messages.length) return messages;

        const roomExists = await sequelize.models[RoomTblName].findOne<RoomModel>({ where: { id: room_id }});

        return !!roomExists ? [] : null;
    }
}