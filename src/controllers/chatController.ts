import { Request, Response } from "express";
import { IChats, Chats } from "../models/chats";

export class chatController {

    public async getChats(req: Request, res: Response): Promise<void> {
        const chats = await Chats.find();
        res.json({ status: 201, data: chats });
    }

    public async saveChat(req: Request, res: Response): Promise<void> {
        const saveChat: IChats = new Chats(req.body);
        const result = await saveChat.save();
        if (result === null) {
            res.sendStatus(500);
        } else {
            res.status(201).json({ status: 201, data: result });
        }
    }
    
}