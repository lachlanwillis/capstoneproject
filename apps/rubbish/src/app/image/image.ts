export interface Image {
    title: string;
    description: string;
    fileName: string;
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
