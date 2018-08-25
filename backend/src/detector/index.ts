import { Detector } from './detector';
import { Image, User } from '../models';
import { Types } from 'mongoose';

export * from './detector';

export function detectorGenerator() {
    const detector = new Detector();

    detector.success$()
        .subscribe(det => {
            Image.findById(det.id)
                .then(image => {
                    console.log(image.id+":", "detection completed.")
                    image.detections = det.detections;
                    if (det.detections.length <= 0) {
                        console.log(image.id + ": no rubbish found.");
                    } else {
                        image.rubbishVisibility = true;
                        console.log(image.userId + ': updating points by ' + det.detections.length)
                        User.findByIdAndUpdate(image.userId, { $inc: { points: det.detections.length || 0 }})
                            .then(() => {})
                            .catch(() => {});
                    }
                    image.save();
                });
        });

    return detector;

}
