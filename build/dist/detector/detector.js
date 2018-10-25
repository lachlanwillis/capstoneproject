"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var darknet_1 = require("darknet");
var rxjs_1 = require("rxjs");
var names_1 = require("./names");
var fs = require("fs");
var path_1 = require("path");
var config = {
    weights: 'bin/rubbish.weights',
    config: "bin/rubbish.cfg",
};
var Detector = /** @class */ (function () {
    function Detector() {
        this.images$ = new rxjs_1.Subject();
        this.completion$ = new rxjs_1.Subject();
        this.detection$ = new rxjs_1.Subject();
        this.darknet = new darknet_1.Darknet({
            weights: config.weights,
            config: config.config,
            names: names_1.names
        });
        this.subscribeToDetections();
        this.completion$.next();
    }
    Detector.prototype.subscribeToDetections = function () {
        var _this = this;
        rxjs_1.zip(this.images$, this.completion$)
            .subscribe(function (x) {
            _this.darknet.detectAsync(x[0].image)
                .then(function (dets) {
                if (dets.length <= 0) {
                    fs.createReadStream(x[0].image).pipe(fs.createWriteStream(path_1.join(__dirname, '../../', 'failed', x[0].image.split('/').pop())));
                }
                _this.completion$.next();
                _this.detection$.next({
                    id: x[0].id,
                    detections: dets
                });
            });
        });
    };
    Detector.prototype.addDetection = function (id, path) {
        console.log(id + ":", "detection started.");
        this.images$.next({
            id: id,
            image: path
        });
    };
    Detector.prototype.success$ = function () {
        return this.detection$.asObservable();
    };
    return Detector;
}());
exports.Detector = Detector;
