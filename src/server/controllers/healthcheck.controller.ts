import express from 'express';
import { ControllerBase } from './base';

export class HealthcheckController extends ControllerBase {
    constructor(server: express.Express) {
        super(server);
        server.get('/healthcheck', (_, res) => res.send(true));
    }
}