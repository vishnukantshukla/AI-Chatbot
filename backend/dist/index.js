"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const connection_js_1 = require("./db/connection.js");
// connections and listners
const PORT = process.env.PORT || 5000;
(0, connection_js_1.connectToDatabase)()
    .then(() => {
    app_js_1.default.listen(PORT, () => {
        console.log(`Server open at ${PORT} && Connected to Database👍`);
    });
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map