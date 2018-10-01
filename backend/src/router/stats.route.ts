import { RequestHandler } from "express";
import { Image } from "../models";

export const RubbishDistributionHandler: RequestHandler = (req, res) => {
  Image.find({})
    .then(images => images.map(x => x.detections))
    .then(detections => detections.reduce((acc, a) => acc.concat(a), []))
    .then(detections =>
      detections.reduce(
        (acc, a) => ({
          ...acc,
          [a.name]: acc[a.name] ? acc[a.name] + 1 : 1
        }),
        {}
      )
    )
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: true, message: err.message }));
};
