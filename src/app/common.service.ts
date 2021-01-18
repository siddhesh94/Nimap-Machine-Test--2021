import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
 // public shareUserObj = new Subject(); 
 url = "http://localhost:3000/userData"
  constructor(private http:HttpClient) { }

  createUser(user){
    return this.http.post(this.url,user)
  }

  getUser(){
    return this.http.get(this.url)
  }

  getUserId(id){
    return this.http.get(`${this.url}/${id}`)
  }

  updateUser(id,user){
    return this.http.put(`${this.url}/${id}`, user)

  }

 

 
}


