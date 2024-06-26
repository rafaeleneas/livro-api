import express from "express";
import cors from "cors";
import winston from "winston";
import clientsRouter from "./routes/client.route.js";
import authorsRouter from "./routes/author.route.js";
import booksRouter from "./routes/book.route.js";
import salesRouter from "./routes/sale.route.js";

import { basicAuth } from './util/auth.middleware.js'

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level} ${message}`;
});
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "store-api.log" })
    ],
    format: combine(
        label({ label: "store-api" }),
        timestamp(),
        myFormat
    )
});

const app = express();
app.use(express.json());
app.use(cors());

// rotas públicas
app.get('/', (req, res) => {
    res.send('Bootcamp IGTI: Desenvolvedor Node JS - Desafio Final. Bem vindo à livraria-api.')
  })

// autenticação
app.use(basicAuth)

app.use("/client", clientsRouter);
app.use("/author", authorsRouter);
app.use("/book", booksRouter);
app.use("/sale", salesRouter);

app.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
})
app.listen(3000, () => console.log("API Started!"));