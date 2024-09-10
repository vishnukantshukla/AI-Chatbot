"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// GET - when we want to get get from database
// PUT ->  if we want to update the data we use put
// POST- when we create new post
// DELETE
//middlewares
app.use(express_1.default.json()); // it is used to read the data from user in the form of json
//connections and listners
app.listen(5000, () => {
    console.log("Server open");
});
//# sourceMappingURL=index.js.map