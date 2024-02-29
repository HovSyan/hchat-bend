import { Server } from "socket.io";
import http from 'http'
import { CORS_WHITELIST, SOCKET_PORT } from "../configs";
import { IMessage } from "../../db/models/message.model";
import { MessagesHandler } from "../../db/handlers/messages.handler";

export class MessagesSocket {
    private _io: Server;
    private _messagesHandler = new MessagesHandler();

    constructor(server: http.Server) {
        this._io = new Server(server);
        this._io.on('connect', (socket) => {
            socket.on('message', this._onMessage.bind(this))
        })
        this._io.listen(SOCKET_PORT, { cors: { origin: CORS_WHITELIST.join() }});
    }

    private async _onMessage(message: IMessage) {
        try {
            const createdMessage = await this._messagesHandler.saveMessage(message);
            this._io.emit('message', createdMessage)
        } catch(e) {
            console.error('Message save error', e);
        }
    }
}