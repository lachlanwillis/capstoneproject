"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.MessageSchema = new mongoose_1.Schema({
    userId: String,
    datestamp: { type: Date, default: Date.now() },
    message: String,
});
exports.Message = mongoose_1.model("Message", exports.MessageSchema);
