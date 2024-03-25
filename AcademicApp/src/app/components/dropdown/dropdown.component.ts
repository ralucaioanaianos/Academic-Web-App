import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  selectedOption: any;


  @Input() options: any = [
    {
      text: 'Mere',
      otherStuff: 'vvdvvdf',
      value: 1
    },
    {
      text: 'Pere',
      otherStuff: 'aaaaaa',
      value: 2
    },
    {
      text: 'Banane',
      otherStuff: 'bbbbbb',
      value: 3
    },
  ];
  @Input() labelText: string = 'Choose option'; 
  @Input() placeholderText: string = 'All';
  @Input() shownProperty: any = 'text';  // when you receive an array of objects with multiple attributes, this is the name of the atribute that is shown in the dropdown options
  @Input() idProperty: any = 'value';  // this is the name of the atribute that is supposed to be the id 
  @Input() hasAll: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

   selected(){
     console.log(this.getSelectedValue());
     console.log(this.getSelectedObject());
     
   }

  getSelectedValue(){
    return this.selectedOption;
  }

  getSelectedObject(){
    // here it works if the client doesn't choose all...check in parent this condition.
    const id = this.getSelectedValue();
    let ceva = this.options.filter((my_option:any) => {
      return my_option[this.idProperty] == id;
    });
    return ceva;
  }

  setOptions(newOptions: any){
    this.options = newOptions
  }
  

}
