"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const middleware_1 = __importDefault(require("./middleware"));
const bodyParser = require("body-parser");
const auth_1 = require("./src/auth");
dotenv_1.default.config();
const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const product_1 = __importDefault(require("./src/routers/product"));
app.post('/auth/register', auth_1.Register);
app.post('/auth/login', auth_1.Login);
app.use('/products', middleware_1.default, product_1.default);
app.get('/', middleware_1.default, (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
