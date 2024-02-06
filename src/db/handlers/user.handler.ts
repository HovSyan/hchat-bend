import { sequelize } from "../db.service";
import { IUser, UserModel, UserTblName } from "../models/user.model";

export class UserHanlder {
    create(usr: Omit<IUser, 'id'>): Promise<UserModel> {
        return sequelize.models[UserTblName].create<UserModel>(usr, { returning: true })
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