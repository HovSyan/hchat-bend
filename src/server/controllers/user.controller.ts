import express from 'express';
import { UserHanlder } from "../../db/handlers/user.handler";
import { IUser } from "../../db/models/user.model";
import { handleError } from '../../utils/error-handler';

export class UserController {
    private _handler = new UserHanlder();

    init(server: express.Express): void {
        server.post('/user', async (req, res) => {
            try {
                this.assertUser(req.body)
                const user = await this.create(req.body);
                res.send(user);
            } catch(e) {
                handleError(e, res);
            }
        });

        server.get('/user', async (req, res) => {
            try {
                console.log
                this.assertQueryParamIdOrNickname(req.query);
                const user = await this.get('id' in req.query ? +req.query.id : req.query.nickname);
                user ? res.send(user) : res.sendStatus(404);
            } catch(e) {
                handleError(e, res);
            }
        })
    }

    private async create(usr: Omit<IUser, 'id'>): Promise<IUser> {
        const user = await this._handler.create(usr.nickname);
        return user.toJSON();
    }

    private async get(nickname: string): Promise<IUser | undefined>
    private async get(id: number): Promise<IUser | undefined>
    private async get(idOrNickname: string | number): Promise<IUser | undefined> {
        const result = await (
            typeof idOrNickname === 'string' ? this._handler.getByNickname(idOrNickname) : this._handler.getById(idOrNickname)
        );
        return result?.toJSON();
    }

    private assertUser(json: unknown): asserts json is IUser {
        const isUser = !!json && typeof json === 'object' && 'nickname' in json && typeof json.nickname === 'string';
        if(!isUser) {
            throw new Error('Bad syntax of User, consider using ' + JSON.stringify(this.mockUserJson));
        }
    }

    private assertQueryParamIdOrNickname(query: any): asserts query is { id: any } | { nickname: any } {
        const isValidQuery = !!query && typeof query === 'object' && ('id' in query || 'nickname' in query);
        if(!isValidQuery) {
            throw new Error('Bad syntax of get User, consider providing id or nickname');
        }
    }

    private get mockUserJson(): Omit<IUser, 'id'> {
        return { nickname: 'string' };
    }
}