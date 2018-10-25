"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var utils_1 = require("../utils");
var __1 = require("..");
/**
 *  The handler for the image upload. Creates an entry in the database for an
 *  image that has been uploaded.
 */
exports.UploadImageHandler = function (req, res) {
    if (req.file === undefined)
        res.json({ error: "No image", message: "Please upload an image file." });
    else {
        if (req.body.title === undefined || !utils_1.isValidSting(req.body.title))
            res.json({ error: "title", message: "Please use an appropriate title." });
        else if (req.body.description === undefined || !utils_1.isValidSting(req.body.description))
            res.json({ error: "description", message: "Please use an appropriate description." });
        else {
            (new models_1.Image({
                title: req.body.title,
                description: req.body.description,
                place: req.body.location,
                location: req.file.path,
                encoding: req.file.encoding,
                mimetype: req.file.mimetype,
                size: req.file.size,
                fileName: req.file.filename,
                userId: req.user.id,
                name: (req.user.facebook || {}).name || (req.user.google || {}).name || (req.user.email || '').split('@')[0] || 'Unknown User',
            })).save()
                .then(function (image) {
                __1.detector.addDetection(image.id, image.location);
                res.json({ message: "Image created successfully." });
            }).catch(function () {
                res.json({ message: "An unexpected error occurred." });
            });
        }
    }
};
/**
 * The handler for updating an image
 */
exports.UpdateMyImageHandler = function (req, res) {
    models_1.Image.findOne({ _id: req.body.id, userId: req.user.id })
        .then(function (image) {
        if (!image) {
            res.status(400).json({ error: true, message: 'No image was found.' });
        }
        else {
            if (req.body.title)
                image.title = req.body.title;
            if (req.body.description)
                image.description = req.body.description;
            image.save()
                .then(function () { return res.json({ success: true, message: 'Image updated successfully' }); })
                .catch(function (err) { return res.status(500).json({ error: true, message: err.message }); });
        }
    })
        .catch(function (err) { return res.status(500).json({ error: true, message: err.message }); });
};
/**
 * The handler for getting images. Sends a list of all images when requested.
 */
exports.GetImageHandler = function (req, res) {
    models_1.Image.find({ deleted: false, rubbishVisibility: true })
        .then(function (images) { return res.json(images); }).catch(function (err) { return res.status(500).send(err); }); // TODO: include a limit later.
};
exports.GetMyImagesHandler = function (req, res) {
    models_1.Image.find({ deleted: false, userId: req.user.id })
        .then(function (images) { return res.json(images); }).catch(function (err) { return res.status(500).send(err); });
};
exports.GetFlaggedImagesHandler = function (req, res) {
    models_1.Image.find({ deleted: false, rubbishVisibility: false }).then(function (images) { return res.json(images); }).catch(function (err) { return res.status(500).send(err); });
};
exports.DeleteMyImageHandler = function (req, res) {
    models_1.Image.findOne({ _id: req.params.id, userId: req.user.id })
        .then(function (image) { image.deleted = true; image.save(); res.json({ success: true, imessage: 'Image deleted successfully.' }); })
        .catch(function (err) { return res.status(500).send(err); });
};
/**
 * The handler for deleting images. Removes an image by an id.
 */
exports.DeleteImageHandler = function (req, res) {
    if (!req.params.id)
        res.status(500).json({ error: true, message: 'Malformed request.' });
    else
        models_1.Image.findById(req.params.id)
            .then(function (image) {
            image.deleted = true;
            image.save()
                .then(function () { return res.json({ success: true, error: false, message: 'Image deleted successfully.' }); })
                .catch(function (err) { return res.status(500).json({ success: false, error: true, message: err }); });
        })
            .catch(function (err) { return res.status(500).json({ success: true, error: true, message: err }); });
};
exports.AcceptFlaggedImageHandler = function (req, res) {
    if (!req.body.id)
        res.status(500).json({ error: true, message: 'Malformed accept request.' });
    else
        models_1.Image.findById(req.body.id).then(function (image) {
            image.rubbishVisibility = true;
            image.save().then(function () { return res.json({ success: true, error: false, message: 'Image accepted successfully.' }); })
                .catch(function (err) { return res.status(500).json({ success: false, error: true, message: err }); });
        }).catch(function (err) { return res.status(500).json({ success: true, error: true, message: err }); });
};
