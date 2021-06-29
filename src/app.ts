import { Server as SocketServer, Socket } from "socket.io";
import * as mongoose from "mongoose";
import * as express from "express";
import * as dotenv from "dotenv";
import { Server } from "http";

class App {

  public connection: mongoose.Connection;
	public app: express.Application;
	public MONGODB: string;
	public io: SocketServer;
	public server: Server;
  public port: string;
  
  constructor() {
		dotenv.config();
		this.app = express();
		this.port = process.env.PORT;
		this.connection = mongoose.connection;
		this.MONGODB = process.env.MONGODB;
  }
  
  public async startServer() {
		await this.connectDB();

		this.server = this.app.listen(this.port, () => {
			console.log(`Listening at port ${this.port}`);
		});

		this.io = new SocketServer(this.server, {
			cors: { origin: "*" }
		});
	}
  
	public async connectDB() {
		try {
			console.log("connected to mongo");
			await mongoose.connect(this.MONGODB, {
				// autoReconnect: true, keepAlive: true, useNewUrlParser: true
				keepAlive: true, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false
			});
			// console.log(mongoose.connection.readyState); // Check mongoose connection state.
			// 0: disconnected
			// 1: connected
			// 2: connecting
			// 3: disconnecting
		} catch (error) {
			console.error(error)
		}
  }
  
  public async socketEvents() {
    this.io.on("connection", (socket: Socket, io: SocketServer = this.io) => {
      console.log("a user connected");
    });
  }

  public async run() {
    await this.startServer();
    await this.socketEvents();
  }
  
}

const server = new App();
server.run();