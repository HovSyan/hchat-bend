import { Sequelize } from "sequelize";
import { sequelize } from "../db.service";
import { init__MessageReaction } from "./message-reaction.model";
import { init__Message } from "./message.model";
import { init__Reaction } from "./reaction.model";
import { init__Room } from "./room.model";
import { init__User } from "./user.model";

export function generateTables(): Promise<Sequelize> {
    init__User();
    init__Room();
    init__Message();
    init__Reaction();
    init__MessageReaction();
    return sequelize.sync({ alter: true })
}