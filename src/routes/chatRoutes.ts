import { Router } from "express";
import { chatController } from "../controllers/chatController";

export class chatRoutes {

    router: Router;
    public chatController: chatController = new chatController();

    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        // For TEST only ! In production, you should use an Identity Provider !!
        this.router.post("/chats", this.chatController.saveChat);
        this.router.get("/chats", this.chatController.getChats);
    }
}