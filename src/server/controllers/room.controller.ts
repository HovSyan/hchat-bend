import express from 'express';
import { handleError } from '../../utils/error-handler';
import { IRoom } from '../../db/models/room.model';
import { RoomHandler } from '../../db/handlers/room.handler';

export class RoomController {
    private _handler = new RoomHandler();

    init(server: express.Express): void {
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
        const isRoom = !!json && typeof json === 'object' && 'name' in json && typeof json.name === 'string';
        if(!isRoom) {
            throw new Error('Bad syntax of Room, consider using ' + JSON.stringify(this.mockRoomJson));
        }
    }

    private assertQueryParamId(query: any): asserts query is { id: any } {
        const isValidQuery = !!query && typeof query === 'object' && 'id' in query;
        if(!isValidQuery) {
            throw new Error('Bad syntax of get Room, consider providing id');
        }
    }

    private get mockRoomJson(): Omit<IRoom, 'id'> {
        return { name: 'string' };
    }
}