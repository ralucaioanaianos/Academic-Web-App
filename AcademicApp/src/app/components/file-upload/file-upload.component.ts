import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  fileName = '';

  constructor(private _http: HttpClient) { }

  onFileSelected(event : any){
    const file:File = event.target.files[0];
    if (file){
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);
      const upload$ = this._http.post("/api/thumbnail-upload", formData);
      upload$.subscribe();
    }
  }

  ngOnInit(): void {
  }

}
