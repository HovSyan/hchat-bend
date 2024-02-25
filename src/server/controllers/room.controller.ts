import express from 'express';
import { handleError } from '../../utils/error-handler';
import { IRoom } from '../../db/models/room.model';
import { RoomHandler } from '../../db/handlers/room.handler';
import { ControllerBase } from './base';
import { MessagesHandler } from '../../db/handlers/messages.handler';
import { RequestChecker } from '../../utils/request-checker';

export class RoomController extends ControllerBase {
    private _checker = new RequestChecker();
    private _handler = new RoomHandler();
    private _messagesHandler = new MessagesHandler();

    constructor(server: express.Express) {
        super(server);
        server.post('/room', async (req, res) => {
            try {
                this.assertRoom(req.body)
                const room = await this.create(req.body);
                res.send(room);
            } catch(e) {
                handleError(e, res);
            }
        });

        server.get('/room', async (req, res) => {
            try {
                this.assertQueryParamId(req.query);
                const room = await this.get(+req.query.id);
                room ? res.send(room) : res.sendStatus(404);
            } catch(e) {
                handleError(e, res);
            }
        })

        server.get('/room/:id/messages', async (req, res) => {
            try {
                const roomId = req.params.id;
                this.assertCorrectQueryParamsForMessagesGet(req.query);
                this.assertCorrectRoomId(roomId);
                const { offset, limit } = req.query;
                const messages = await this._messagesHandler.getByRoomId(+roomId, +offset, +limit);
                if (messages) {
                    return res.send(messages);
                }
                return res.status(404).send('No room was found by ' + roomId);
            } catch(e) {
                handleError(e, res);
            }
        })

        server.get('/rooms', async (req, res) => {
            try {
                const rooms = await this.getAll();
                rooms ? res.send(rooms) : res.sendStatus(404);
            } catch(e) {
                handleError(e, res);
            }
        })
    }

    private async create(roomJson: Omit<IRoom, 'id'>): Promise<IRoom> {
        const room = await this._handler.create(roomJson.name);
        return room.toJSON();
    }

    private async get(id: number): Promise<IRoom | undefined> {
        const result = await this._handler.getById(id);
        return result?.toJSON();
    }

    private async getAll(): Promise<IRoom[] | undefined> {
        const result = await this._handler.getAll();
        return result?.map(_ => _.toJSON());
    }

    private assertRoom(json: unknown): asserts json is IRoom {
        const isRoom = this._checker.isObject(json) && 'name' in json && typeof json.name === 'string';
        if(!isRoom) {
            throw new Error('Bad syntax of Room, consider using ' + JSON.stringify(this.mockRoomJson));
        }
    }

    private assertQueryParamId(query: any): asserts query is { id: any } {
        const isValidQuery = this._checker.isObject(query) && 'id' in query;
        if(!isValidQuery) {
            throw new Error('Bad syntax of get Room, consider providing id');
        }
    }

    private assertCorrectQueryParamsForMessagesGet(query: any): asserts query is { offset: string, limit: string } {
        const isValidQuery = this._checker.isObject(query) 
            && this._checker.hasNumberProperty(query, 'offset') 
            && this._checker.hasNumberProperty(query, 'limit');
        
        if(!isValidQuery) {
            throw new Error('Bad syntax of get Messages, consider providing both offset and limit query params');
        }
    }

    private assertCorrectRoomId(roomId: string) {
        if (Number.isNaN(+roomId)) {
            throw new Error('Invalid room id');
        }
    }

    private get mockRoomJson(): Omit<IRoom, 'id'> {
        return { name: 'string' };
    }
}