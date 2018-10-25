"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var detector_1 = require("./detector");
var models_1 = require("../models");
__export(require("./detector"));
function detectorGenerator() {
    var detector = new detector_1.Detector();
    detector.success$()
        .subscribe(function (det) {
        models_1.Image.findById(det.id)
            .then(function (image) {
            console.log(image.id + ":", "detection completed.");
            image.detections = det.detections;
            if (det.detections.length <= 0) {
                console.log(image.id + ": no rubbish found.");
                models_1.Message.create({ userId: image.userId, message: 'No rubbish was detected in your image and it will remain private. Image id: ' + image.id })
                    .then(function () { })
                    .catch(function () { });
            }
            else {
                image.rubbishVisibility = true;
                console.log(image.userId + ': updating points by ' + det.detections.length);
                models_1.Message.create({ userId: image.userId, message: det.detections.length + " pieces of rubbish were found in your image and it's been made public. Image id: " + image.id })
                    .then(function () { })
                    .catch(function () { });
                models_1.User.findByIdAndUpdate(image.userId, { $inc: { points: det.detections.length || 0 } })
                    .then(function () { })
                    .catch(function () { });
            }
            image.save();
        });
    });
    return detector;
}
exports.detectorGenerator = detectorGenerator;
