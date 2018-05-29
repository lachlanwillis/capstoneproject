import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageService } from '../images/image.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-upload',
  templateUrl: './user-upload.component.html',
  styleUrls: ['./user-upload.component.scss']
})

export class UserUploadComponent {

  constructor(private readonly image: ImageService, 
              private readonly router: Router) { }
  currentTitle: string = null;
  currentDescription = null;
  currentFile = null;
  localImage: any[];

  titleFormControl = new FormControl('', [
    Validators.required,
  ]);

  descFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

  onFileSelected(event) {
    this.currentFile = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.localImage = event.target.result;
    }
    reader.readAsDataURL(this.currentFile);
  }

  changeTitleValue(event) {
    this.currentTitle = event.target.value;
  }

  changeDescriptionValue(event) {
    this.currentDescription = event.target.value;
  }

  onUploadFile() {

    console.log('clicked');

    const fd = new FormData();
    fd.append('image', this.currentFile, this.currentFile.name);
    fd.set("title", this.currentTitle);
    fd.set("description", this.currentDescription);

    this.image.uploadImage(fd)
      .subscribe(res => {
        this.router.navigateByUrl('/');
      });

  }

}
