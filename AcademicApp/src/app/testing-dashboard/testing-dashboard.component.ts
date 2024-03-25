import { Component, OnInit } from '@angular/core';
import { TABLE_TEST_DATA } from './testingData';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-testing-dashboard',
  templateUrl: './testing-dashboard.component.html',
  styleUrls: ['./testing-dashboard.component.css']
})

export class TestingDashboardComponent implements OnInit {
  // -- table testing stuff don't delete pls
  tableTestData = TABLE_TEST_DATA
  testHeaders = ['name', 'year']
  // ---

  constructor() { }

exportAsPDF(divId: any) {
  console.log("in exportpdf");
  //let data = document.getElementById('divId');
  const data = document.createElement('myContractDiv');
  
  if (!data) {
    console.log("no data");
  }
  if (data) { 
    data.innerHTML = `
    <h1>CONTRACT</h1>
    
  `
    document.body.appendChild(data);

    console.log(data);
    //html2canvas(data);
  html2canvas(data).then(canvas => {
  const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
  //let pdf = new jspdf.jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
  let pdf = new jspdf.jsPDF('p', 'cm', 'a4');// Generates PDF in portrait mode
  pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
  pdf.save('Filename.pdf');   
});
  const el = document.querySelector('myContractDiv');
  if (el)
    {
      const pel = el.parentElement;
      if (pel) {
        pel.removeChild(el);
      }
      else console.log("no pel");
} 
else console.log("no el");
    }
  }

    generatePdf(data: any) {
      html2canvas(data, { allowTaint: true }).then(canvas => {
       let HTML_Width = canvas.width;
       let HTML_Height = canvas.height;
       let top_left_margin = 15;
       let PDF_Width = HTML_Width + (top_left_margin * 2);
       let PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
       let canvas_image_width = HTML_Width;
       let canvas_image_height = HTML_Height;
       let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
       canvas.getContext('2d');
       let imgData = canvas.toDataURL("image/jpeg", 1.0);
       let pdf = new jspdf.jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
       pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
       for (let i = 1; i <= totalPDFPages; i++) {
         pdf.addPage([PDF_Width, PDF_Height], 'p');
         pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
       }
        pdf.save("HTML-Document.pdf");
     });
   }
  
  /*public downloadAsPDF() {
    const doc = new jspdf.jsPDF();

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const pdfTable = this.pdfTable.nativeElement;

    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('tableToPdf.pdf');
  }*/

  ngOnInit(): void {
  }
}
