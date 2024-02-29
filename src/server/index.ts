import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import { Logger } from '../utils/logger';
import { CORS_WHITELIST, PORT } from './configs';
import { UserController } from './controllers/user.controller';
import { RoomController } from './controllers/room.controller';
import { HealthcheckController } from './controllers/healthcheck.controller';
import { MessagesSocket } from './sockets/messages.socket';
import cors from 'cors';

class Server {
    private _serverApp = express();
    private _logger = new Logger();

    async init(): Promise<void> {
        this._initControllers();
        const httpServer = await this._listen();
        this._logger.logln(`Server running at PORT ${PORT}...`, '✅');
        this._logger.log('Initializing socket...');
        this._initSocket(httpServer);
        this._logger.logln('✅');
        this._logger.logln('Done!');
    }

    private _listen(): Promise<http.Server> {
        this._serverApp.use(cors({ origin: CORS_WHITELIST }))
        return new Promise(res => {
            const server = this._serverApp.listen(PORT, () => res(server))
        })
    }

    private _initControllers(): void {
        this._serverApp.use(cors({ origin: CORS_WHITELIST.join() }))
        this._serverApp.use(express.json());
        this._serverApp.use(bodyParser.urlencoded({ extended: true }))
        new UserController(this._serverApp);
        new RoomController(this._serverApp);
        new HealthcheckController(this._serverApp);
    }

    private _initSocket(server: http.Server) {
        new MessagesSocket(server);
    }
}

export const server = new Server();