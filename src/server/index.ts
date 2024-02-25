import express from 'express';
import bodyParser from 'body-parser';
import { Logger } from '../utils/logger';
import { PORT } from './configs';
import { UserController } from './controllers/user.controller';
import { RoomController } from './controllers/room.controller';
import { HealthcheckController } from './controllers/healthcheck.controller';

class Server {
    private _serverApp = express();
    private _logger = new Logger();

    init(): Promise<void> {
        this._initControllers();
        return new Promise(res => {
            this._serverApp.listen(PORT, () => {
                this._logger.logln(`Server running at PORT ${PORT}...`, '✅');
                this._logger.logln('Done!');
                res();
            })
        });
    }

    private _initControllers(): void {
        this._serverApp.use(express.json());
        this._serverApp.use(bodyParser.urlencoded({ extended: true }))
        new UserController(this._serverApp);
        new RoomController(this._serverApp);
        new HealthcheckController(this._serverApp);
    }
}

export const server = new Server();