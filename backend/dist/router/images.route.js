"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
exports.UploadImageHandler = function (req, res) {
    if (req.file === undefined)
        res.json({ error: "No image", message: "Please upload an image file." });
    else {
        if (req.body.title === undefined || isInvalidTitle(req.body.title))
            res.json({ error: "title", message: "Please use an appropriate title." });
        else {
            (new models_1.Image({
                title: req.body.title,
                description: req.body.description,
                location: req.file.path,
                encoding: req.file.encoding,
                mimetype: req.file.mimetype,
                size: req.file.size
            })).save()
                .then(function () {
                res.json({ message: "Image created successfully." });
            }).catch(function () {
                res.json({ message: "An unexpected error occurred." });
            });
        }
    }
};
function isInvalidTitle(title) {
    return title.replace(' ', '').split('').length <= 0;
}
