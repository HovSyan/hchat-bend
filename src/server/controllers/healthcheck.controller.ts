import express from 'express';

export class HealthcheckController {
    init(server: express.Express): void {
        server.get('/healthcheck', (_, res) => res.send(true));
    }
}