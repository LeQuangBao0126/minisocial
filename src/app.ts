import { Route } from '@core/interfaces';
import express from 'express';
import mongoose from 'mongoose';

import hpp from 'hpp';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import { Logger } from '@core/utils';
import ErrorMiddleware from "@middleware/error.middleware";

export default class App {
    public app: express.Application;
    public port: String | Number;
    public mogoosedb: any;
    //khai báo biến có thể dùng production hay dev
    public isProduction: Boolean = process.env.NODE_ENV == 'production' ? true : false;
    constructor(routes: Route[]) {
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.initialRoutes(routes);
        this.mogoosedb = mongoose;
        this.initializeMiddlewares();
    }
    private initialRoutes(routes: Route[]) {
        routes.forEach(route => {
            this.app.use("/", route.router);
        })
    }
    public listen() {
        this.app.listen(this.port, () => {
            Logger.info(`Server running in ${this.port}`)
        });
    }
    public connectDB(url: string) {
        let options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        this.mogoosedb.connect(url, options, (err: any) => {
            if (err) {
                Logger.info("Connection db fail")
            } else {
                Logger.info("Connection db success")
            }
        })
    }
    // 1  số middleware
    public initializeMiddlewares() {
        //neu moi truong la production true
        if (this.isProduction) {
            this.app.use(hpp());
            this.app.use(helmet());
            this.app.use(morgan('tiny'));
            this.app.use(cors({ origin: 'http://example.com', credentials: true }));
        } else {
            this.app.use(morgan('tiny'));
            this.app.use(cors({ origin: 'http://localhost:5555', credentials: true }));
        }
        this.app.use(ErrorMiddleware);
    }
}