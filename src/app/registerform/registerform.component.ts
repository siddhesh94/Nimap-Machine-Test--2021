import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from '../common.service';
import {Router} from '@angular/router';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ActivatedRoute } from '@angular/router';

export interface Interest {
  name:string;
}

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css']
})
export class RegisterformComponent implements OnInit {
  formatLabel(value: number) {
    if (value > 70) {
      return Math.round(value / 70) ;
    }

    return value;
  }

  registerForm = new FormGroup({
    imageName: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    phoneno: new FormControl(''),
    age: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
    addresses: new FormGroup({
      address: new FormControl(''),
      address1: new FormControl(''),
      address2: new FormControl('')
    }),
    interest: new FormControl(''),
    subscribe:new FormControl('')
  })

  //public registerForm: FormGroup;
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


  constructor( private common:CommonService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params.id)
    this.common.getUserId(this.activatedRoute.snapshot.params.id).subscribe((result)=>{
      this.registerForm = new FormGroup({
        imageName: new FormControl(result['imageName']),
        firstname: new FormControl(result['firstname']),
        lastname: new FormControl(result['lastname']),
        email: new FormControl(result['email']),
        phoneno: new FormControl(result['phoneno']),
        age: new FormControl(result['age']),
        state: new FormControl(result['state']),
        country: new FormControl(result['country']),
        addresses: new FormGroup({
          address: new FormControl(result['address']),
          address1: new FormControl(result['address1']),
          address2: new FormControl(result['address2'])
        }),
        interest: new FormControl(result['interest']),
        subscribe:new FormControl(result['subscribe'])
      })
    })
  }
  updateUserProfile(){
    this.common.updateUser(this.activatedRoute.snapshot.params.id, this.registerForm.value).subscribe((result)=>{
      console.log(result, "data updated succesfully")
      this.router.navigateByUrl("/user-profile");
    })
  } 
  // showModal(){
  //   this.isDisplay = true;
  //   }

  // closeModal(){
  // this.isDisplay = false;
  // }

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


