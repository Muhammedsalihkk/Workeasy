"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const company_router_1 = __importDefault(require("./routers/company-router"));
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const app = (0, express_1.default)();
(0, db_1.connectdb)();
app.use(express_1.default.json());
app.use('/api', company_router_1.default);
app.listen(env_1.configdata.Port, () => {
    console.log(`server is running on ${env_1.configdata.Port}`);
});
exports.default = app;
