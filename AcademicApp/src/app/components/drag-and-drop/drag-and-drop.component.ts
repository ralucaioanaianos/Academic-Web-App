import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {

  allFiles: File[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  droppedFiles(allFiles: File[]): void {
    const filesAmount = allFiles.length;
    for (let i = 0; i < filesAmount; i++) {
      const file = allFiles[i];
      this.allFiles.push(file);
    }
  }

  deleteAllFiles(){
      this.allFiles = [];
  }
}
