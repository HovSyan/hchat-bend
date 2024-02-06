import express, { Express } from 'express';
import multer from 'multer';
import { UserHanlder } from "../../db/handlers/user.handler";
import { IUser } from "../../db/models/user.model";
import { handleError } from '../../utils/error-handler';

const upload = multer();

export class UserController {
    private _handler = new UserHanlder();

    init(server: express.Express): void {
        server.post('/user', upload.single('avatar'), async (req, res) => {
            try {
                this.assertUser(req.body)
                const user = await this.create({ ...req.body, avatar: this.toBase64Image(req.file) });
                res.send(user);
            } catch(e) {
                handleError(e, res);
            }
        });

        server.get('/user', async (req, res) => {
            try {
                this.assertQueryParamIdOrNickname(req.query);
                const user = await this.get('id' in req.query ? +req.query.id : req.query.nickname);
                user ? res.send(user) : res.sendStatus(404);
            } catch(e) {
                handleError(e, res);
            }
        })

        server.get('/user/nicknameExists', async (req, res) => {
            try {
                this.assertQueryParamNickname(req.query);
                const user = await this.get(req.query.nickname);
                res.send(!!user);
            } catch(e) {
                handleError(e, res);
            }
        })
    }

    private async create(usr: Omit<IUser, 'id'>): Promise<IUser> {
        const user = await this._handler.create(usr);
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

    private assertQueryParamNickname(query: any): asserts query is { nickname: any } {
        const isValidQuery = !!query && typeof query === 'object' && 'nickname' in query;
        if(!isValidQuery) {
            throw new Error('Bad syntax, consider providing nickname');
        }
    }

    private toBase64Image(file: Express.Multer.File | undefined): string | undefined {
        return file?.buffer.toString('base64');
    }

    private get mockUserJson(): Omit<IUser, 'id'> {
        return { nickname: 'string' };
    }
}