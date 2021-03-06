import { Darknet, Detection } from 'darknet';
import { Subject, Observable, zip } from 'rxjs';
import { names } from './names';

import * as fs from 'fs';
import { join } from 'path';

const config = {
    weights: 'bin/rubbish.weights',
    config: "bin/rubbish.cfg",
};

export interface IDetectMe {
    image: string;
    id: string;
}

export interface IDetection {
    id: string;
    detections: Detection[];
}

export class Detector {
    private darknet;

    private images$ = new Subject<IDetectMe>();
    private completion$ = new Subject();
    private detection$ = new Subject<IDetection>();

    constructor() {
        this.darknet = new Darknet({
            weights: config.weights,
            config: config.config,
            names: names
        });

        this.subscribeToDetections();
        this.completion$.next();

    }

    private subscribeToDetections() {
        zip(this.images$, this.completion$)
            .subscribe(x => {
                this.darknet.detectAsync(x[0].image)
                    .then(dets => {

                        if (dets.length <= 0) {
                            fs.createReadStream(x[0].image).pipe(fs.createWriteStream(join(__dirname, '../../', 'failed', x[0].image.split('/').pop() )));
                        }


                        this.completion$.next();
                        this.detection$.next({
                            id: x[0].id,
                            detections: dets
                        });
                    });
            })
    }

    addDetection(id: string, path: string) {
        console.log(id+":", "detection started.");
        this.images$.next({
            id: id,
            image: path
        });
    }

    success$(): Observable<IDetection> {
        return this.detection$.asObservable();
    }

}