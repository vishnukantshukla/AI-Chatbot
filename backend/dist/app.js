"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
(0, dotenv_1.config)(); // with the help of thsi we can connect our database securely
const app = (0, express_1.default)();
// GET - when we want to get get from database
// PUT ->  if we want to update the data we use put
// POST- when we create new post
// DELETE
//middlewares
app.use(express_1.default.json()); // it is used to read the data from user in the form of json
// remove morgan it in production but we used it in development mode for lock when api request is send to backend
app.use((0, morgan_1.default)("dev"));
app.use("/api/v1", routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map