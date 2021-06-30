import { Document, Schema, Model, model, Error } from "mongoose";

export interface IChats extends Document {
  message: String;
  name: String;
}

export const chatsSchema = new Schema({
    message: String,
    name: String
});

export const Chats: Model<IChats> = model<IChats>("chats", chatsSchema);