import { sequelize } from "../db.service";
import { RoomModel, RoomTblName } from "../models/room.model";

export class RoomHandler {
    create(name: string): Promise<RoomModel> {
        return sequelize.models[RoomTblName].create<RoomModel>({ name }, { returning: true });
    }

    getById(id: number): Promise<RoomModel | null> {
        return sequelize.models[RoomTblName].findOne<RoomModel>({
            where: { id }
        })
    }
}