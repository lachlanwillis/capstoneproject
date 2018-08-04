import { ImageService } from "./image.service";
import { of } from "rxjs/observable/of";

export class ImageStub {
    getImages = jasmine.createSpy('getImages').and.callFake(() => of([{ title: 'great title', _id: '1234', location: 'google.com' }]));
    uploadImage = jasmine.createSpy('uploadImage').and.callThrough();
    getMyImages = jasmine.createSpy('getMyImages').and.callThrough();
    deleteMyImages = jasmine.createSpy('deleteMyImages').and.callThrough();
    deleteImage = jasmine.createSpy('deleteImage').and.callThrough();
}

export const IMAGE_SERVICE_STUB_PROVIDER = {
    provide: ImageService,
    useClass: ImageStub
}