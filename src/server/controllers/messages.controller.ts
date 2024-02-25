import express from 'express';
import { ControllerBase } from "./base";

export class MessagesController extends ControllerBase {
    constructor(server: express.Express) {
        super(server);
    }
}