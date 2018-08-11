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
      .pipe(take(1), map(res => res.filter(a =>!!a.fileName)));
  }

  getMyImages(filter?: string) {
    return this.http.get<any[]>('/api/my-images')
      .pipe(take(1), map(res => res.filter(a => !!a.fileName)));
  }

  getFlaggedImages() {
    return this.http.get<any[]>('/api/flagged-images')
      .pipe(take(1), map(res => res.filter(a => !!a.fileName)));
  }


  deleteMyImage(id: string) {
    return this.http.delete(`/api/my-image/${id}`)
      .pipe(take(1));
  }

  deleteImage(id: string) {
    return this.http.delete(`${DELETE_IMAGE_URL}/${id}`)
      .pipe(take(1));
  }

}
