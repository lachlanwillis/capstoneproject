import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageService } from '../images/image.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { MessagesService } from '../messages/messages.service';
import { UserData } from '../message-hub/message';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../auth/auth.service';

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

  constructor(
    private readonly image: ImageService, 
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly messages: MessagesService,
    private readonly snack: MatSnackBar,
    ) { }
  currentTitle: string = null;
  currentDescription = null;
  currentLocation?: string;
  currentFile = null;
  localImage: any[];

  sentMessage?: string;
  selectedUser?: any;

  titleFormControl = new FormControl('', [
    Validators.required,
  ]);

  locationFormControl = new FormControl('');

  descFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.loadUser();
  }

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

  changeLocationValue(event): void {
    this.currentLocation = event.target.value;
  }

  onUploadFile() {
    const fd = new FormData();
    fd.append('image', this.currentFile, this.currentFile.name);
    fd.set("title", this.currentTitle);
    fd.set("description", this.currentDescription);
    fd.set("location", this.currentLocation || '');

    this.image.uploadImage(fd)
      .subscribe(res => {
        this.loadUser();
        this.sentMessage = "Image titled '" + this.currentTitle + "' was successfully uploaded.";
        this.sendMessage(this.selectedUser, this.sentMessage);
        this.router.navigateByUrl('/browse-public');
      });
  }

  sendMessage(user : any, message : string) {
    this.messages.messageUser(user._id, message)
      .subscribe((value: any) => {});
  }

  loadUser () {
    this.auth.getCurrentUser()
      .subscribe(user => this.selectedUser = user);
  }
}
