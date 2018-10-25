import { Detector } from './detector';
import { Image, User, Message } from '../models';
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
                        Message.create({ userId: image.userId, message: 'No rubbish was detected in your image and it will remain private. Image id: ' + image.id})
                            .then(() => {})
                            .catch(() => {});
                    } else {
                        image.rubbishVisibility = true;
                        console.log(image.userId + ': updating points by ' + det.detections.length)
                        Message.create({ userId: image.userId, message: `${det.detections.length} pieces of rubbish were found in your image and it's been made public. Image id: ${image.id}` })
                            .then(() => {})
                            .catch(() => {})
                        User.findByIdAndUpdate(image.userId, { $inc: { points: det.detections.length || 0 }})
                            .then(() => {})
                            .catch(() => {});
                    }
                    image.save();
                });
        });

    return detector;

}
