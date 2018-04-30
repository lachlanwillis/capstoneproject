import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-upload',
  templateUrl: './user-upload.component.html',
  styleUrls: ['./user-upload.component.css']
})
export class UserUploadComponent implements OnInit {

  constructor(private http: HttpClient) { }

  currentFile = null;

  onFileSelected(event) {
    this.currentFile = event.target.files[0];
  }

  onUploadFile() {
    const fd = new FormData();
    fd.append('image', this.currentFile, this.currentFile.name);
    this.http.post('/api/upload-image', fd).subscribe(res => {
      console.log(res);
    });
  }



  ngOnInit() {
  }

}
