"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
exports.disconnectFromDatabase = disconnectFromDatabase;
const mongoose_1 = require("mongoose");
async function connectToDatabase() {
    try {
        await (0, mongoose_1.connect)(process.env.MONGODB_URL); // mere connect will help in connecting database
    }
    catch (error) {
        console.log(error);
        throw new Error("Cannot Conect TO MongoDb");
    }
}
async function disconnectFromDatabase() {
    try {
        await (0, mongoose_1.disconnect)(); // when we want to disconnect from database when anything wrong oocur as for thr security parameter
    }
    catch (error) {
        console.log(error);
        throw new Error("Cannot Conect TO MongoDb");
    }
}
//# sourceMappingURL=connection.js.map