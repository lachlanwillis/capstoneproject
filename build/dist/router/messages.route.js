"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
/**
 * The handler for getting messages. Sends a list of all messages when requested.
 */
exports.GetMyMessagesHandler = function (req, res) {
    models_1.Message.find({ userId: req.user.id })
        .then(function (messages) { return res.json(messages); }).catch(function (err) { return res.status(500).send(err); });
};
// Delete message handler
exports.DeleteMyMessageHandler = function (req, res) {
    models_1.Message.remove({ _id: req.params.id, userId: req.user.id })
        .then(function (message) { return res.json({ success: true, imessage: 'Message deleted successfully.' }); })
        .catch(function (err) { return res.status(500).send(err); });
};
// Send message handler
exports.SendMessageHandler = function (req, res) {
    (new models_1.Message({
        userId: req.body.id,
        message: req.body.message
    })).save()
        .then(function (image) {
        res.json({ message: "Message sent successfully." });
    }).catch(function () {
        res.json({ message: "An unexpected error occurred." });
    });
};
