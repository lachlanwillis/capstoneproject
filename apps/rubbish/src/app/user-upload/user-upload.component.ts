import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-upload',
  templateUrl: './user-upload.component.html',
  styleUrls: ['./user-upload.component.css']
})
export class UserUploadComponent implements OnInit {

  constructor(private http: HttpClient) { }
  currentTitle: string = null;
  currentDescription = null;
  currentFile = null;

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
    fd.append(this.currentTitle, this.currentFile, this.currentDescription);
    
    this.http.post('/api/upload-image', fd).subscribe(res => {
      console.log(res);
    });
  }



  ngOnInit() {
  }

}
