import express from "express";

export abstract class ControllerBase {
    constructor(protected server: express.Express) {}
}