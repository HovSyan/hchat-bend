import express from 'express';
import { Logger } from '../utils/logger';
import { PORT } from './configs';
import { UserController } from './controllers/user.controller';
import { RoomController } from './controllers/room.controller';

class Server {
    private _serverApp = express();
    private _logger = new Logger();
    private _userController = new UserController();
    private _roomController = new RoomController();

    init(): Promise<void> {
        this._initControllers();
        this._serverApp.listen(PORT, () => {
            this._logger.logln(`Server running at PORT ${PORT}...`, '✅');
            this._logger.logln('Done!');
        })
        return Promise.resolve();
    }

    private _initControllers(): void {
        this._serverApp.use(express.json());
        this._userController.init(this._serverApp);
        this._roomController.init(this._serverApp);
    }
}

export const server = new Server();