import { sequelize } from "../db.service";
import { IUser, UserModel, UserTblName } from "../models/user.model";

export class UserHanlder {
    create(nickname: string): Promise<UserModel> {
        return sequelize.models[UserTblName].create<UserModel>({ nickname }, { returning: true })
    }

    getById(id: number): Promise<UserModel | null> {
        return sequelize.models[UserTblName].findOne<UserModel>({
            where: { id }
        })
    }

    getByNickname(nickname: string): Promise<UserModel | null> {
        return sequelize.models[UserTblName].findOne<UserModel>({
            where: { nickname }
        })
    }
}