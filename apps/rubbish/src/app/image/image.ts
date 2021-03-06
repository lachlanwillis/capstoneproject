export interface Image {
    _id: string;
    title: string;
    description: string;
    fileName: string;
    name: string;
    place: string;
    detections: Detection[];
}

export interface Detection {
    name: string;
    prob: number;
    box: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
}
