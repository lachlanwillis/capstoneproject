import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

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

export class UserUploadComponent implements OnInit {

  constructor(private http: HttpClient) { }
  currentTitle: string = null;
  currentDescription = null;
  currentFile = null;

  titleFormControl = new FormControl('', [
    Validators.required,
  ]);

  descFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

  onFileSelected(event) {
    this.currentFile = event.target.files[0];
  }

  changeTitleValue(event) {
    this.currentTitle = event.target.value;
  }

  changeDescriptionValue(event) {
    this.currentDescription = event.target.value;
  }

  onUploadFile() {
    const fd = new FormData();
    fd.append('image', this.currentFile, this.currentFile.name);
    fd.set("title", this.currentTitle);
    fd.set("description", this.currentDescription);

    this.http.post('/api/upload-image', fd).subscribe(res => {
      console.log(res);
    });
  }



  ngOnInit() {
  }

}
