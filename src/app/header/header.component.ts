import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import {Router} from '@angular/router';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

export interface Interest {
  name:string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  formatLabel(value: number) {
    if (value > 70) {
      return Math.round(value / 70) ;
    }

    return value;
  }

  
  

  public registerForm: FormGroup;
  isDisplay = false;
  imageURL:string = "/assets/image/default.png";
  fileToUpload:File = null;
  state = ['Maharashtra','Assam','Goa','Rajasthan'];
  country = ['India','USA','France','Germany'];
  addressType = ['Home','Company'];
  addressOnSelect:boolean = false;

  submitted = false;
  formObj: any;
  

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  interests: Interest[] = [
   {name:''}
  ];

  constructor(private fb: FormBuilder, private common:CommonService, private router:Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: ['',[Validators.required, Validators.pattern(/^[a-zA-Z]{1,20}$/)]],
      lastname: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      phoneno: ['',[Validators.required]],
      age: ['',[Validators.required]],
      state: [''],
      country: [''],
      imageName: [''],
      addresses: this.fb.group({
      address: [''],
      address1: [''],
      address2: ['']
      }),
      interest:['']

    });
      
   }

  showModal(){
  this.isDisplay = true;
  
  }

  closeModal(){
   this.isDisplay = false;
  }

  addData(userObj){

    
    this.submitted = true;
    this.common.createUser(this.registerForm.value).subscribe((res)=>{
      console.log(res);
      if(res){
        this.router.navigateByUrl('/user-profile');
      }else{
        console.log("Not ok");
      }
      
    },(error)=>{
      console.log(error);
    })
   
    
  }   

  handleFileInput(file:FileList){
    this.fileToUpload = file.item(0);
    var  reader = new FileReader();
    reader.onload = (event:any)=>{
    this.imageURL = event.target.result;
    this.common.createUser(file).subscribe((res)=>{
      console.log(res);
    })
    }
    reader.readAsDataURL(this.fileToUpload);
  }
 
  selectAddress(){
    this.addressOnSelect = true;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.interests.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(interests: Interest): void {
    const index = this.interests.indexOf(interests);

    if (index >= 0) {
      this.interests.splice(index, 1);
    }
  }


}

  
