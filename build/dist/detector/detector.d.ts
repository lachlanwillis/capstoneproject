import { Detection } from 'darknet';
import { Observable } from 'rxjs';
export interface IDetectMe {
    image: string;
    id: string;
}
export interface IDetection {
    id: string;
    detections: Detection[];
}
export declare class Detector {
    private darknet;
    private images$;
    private completion$;
    private detection$;
    constructor();
    private subscribeToDetections();
    addDetection(id: string, path: string): void;
    success$(): Observable<IDetection>;
}
