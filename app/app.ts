import "reflect-metadata";
import cors from 'cors';
import express, { NextFunction, Request, Response } from "express";
import {ERROR_404, ERROR_500} from "./src/common/messages/common.errors";
import apiRoutes from "./src/routers";
import {API, CORS} from "./src/common/constants/app.constants";
import appLogger from "./src/common/logger";

const app = express();

const corsOptions = {
    origin: CORS.ALLOW,
    methods: CORS.METHODS,
    allowedHeaders: CORS.ALLOWED_HEADERS
};
app.use(cors(corsOptions));
app.use(express.json());

app.use(`/${API.VERSION_V1}`, apiRoutes);

// Not found handler
app.use((req: Request, res: Response, next: NextFunction): void => {
    appLogger.info("setNotFoundHandler | url: ", req.url);
    appLogger.info("setErrorHandler | nex: ", next.name);
    res.status(ERROR_404.ROUTER_NOT_FOUND.statusCode).json(ERROR_404.ROUTER_NOT_FOUND);
});

// Error found handler
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    appLogger.info("setErrorHandler | url: ", req.url);
    appLogger.info("setErrorHandler | next: ", next.name);
    appLogger.error("setErrorHandler | error: ", err);

    res.status(ERROR_500.UNKNOWN.statusCode).json(ERROR_500.UNKNOWN);
});

export default app;
