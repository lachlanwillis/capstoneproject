import { Detector } from './detector';
import { Image } from '../models';

export * from './detector';

export function detectorGenerator() {
    const detector = new Detector();

    detector.success$()
        .subscribe(det => {
            Image.findById(det.id)
                .then(image => {
                    console.log('saving the stuff', det.detections);
                    image.detections = det.detections;
                    image.save();
                });
        });

    return detector;

}