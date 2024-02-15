// app.ts
import express, { Application } from "express";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { config } from "dotenv";
import { Routes } from "./routes/index.routes";

config();

class App {
    public express: Application;
    public mongoPath = process.env.MONGO_URL || 'mongodb://localhost:27017/yourdbname';
    public router: Routes = new Routes();

  
    constructor() {
      this.express = express();
      this.configureApp();
      this.router = new Routes();
    }
  
    private configureApp(): void {
      this.express.use(helmet());
      this.express.use(cors());
      this.express.use(morgan("dev"));
      this.express.use(express.json());
      this.express.use(express.urlencoded({ extended: false }));
      this.express.use(compression());
    }
  
    public async initialiseDatabaseConnection(): Promise<void> {
      try {
        console.log(`:::connecting to database:::`);
        await mongoose.connect(this.mongoPath);
        console.log(`:::connected to database:::`);
      } catch (err: any) {
        console.log("Mongo error in connection:", err.message || err);
        throw err;
      }
    }

    public initializeRoutes(): void {
      this.router.routes(this.express);
    }
}

export default App;
