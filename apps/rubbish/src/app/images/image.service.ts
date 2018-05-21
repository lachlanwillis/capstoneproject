import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, map } from 'rxjs/operators';

const UPLOAD_IMAGE_URL = `/api/upload-image`;
const GET_IMAGE_URL = `/api/get-images`;
const DELETE_IMAGE_URL = '/api/delete-image'

@Injectable()
export class ImageService {

  constructor(private readonly http: HttpClient) { }

  uploadImage(form: FormData) {
    return this.http.post(UPLOAD_IMAGE_URL, form)
      .pipe(take(1));
  }

  getImages(filter?: string) {
    return this.http.get<any[]>('/api/display-image')
      .pipe(take(1), map(res => res.filter(a => !!a.fileName)))
  }

  deleteImage(id: string) {
    return this.http.delete(`${DELETE_IMAGE_URL}/${id}`)
      .pipe(take(1));
  }

}
