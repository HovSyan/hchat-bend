import express from 'express';
import { Logger } from '../utils/logger';
import { PORT } from './configs';

class Server {
    private _serverApp = express();
    private _logger = new Logger();

    init(): Promise<void> {
        this._serverApp.listen(PORT, () => {
            this._logger.logln(`Server running at PORT ${PORT}...`, '✅');
            this._logger.logln('Done!');
        })
        return Promise.resolve();
    }
}

export const server = new Server();