import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile:any;
  editProfile:any;
  constructor(private common:CommonService) { }

  ngOnInit(): void {
    
    this.getProfileData();
  }
  

  getProfileData(){
   this.common.getUser().subscribe((res)=>{
   this.userProfile = res;
  console.log(res);
    if(res){
      this.userProfile = res;
      console.log("Inside User profile",this.userProfile);
    }
  },(err)=>{
    console.log(err);
  })
  }

 
}
