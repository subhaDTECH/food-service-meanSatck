import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

//get all order data
  getDataApi(){
    return this.http.get("http://localhost:3000/posts").pipe(map((res)=>{
      return res;
    }))
  }


  //post order 
  postDataApi(data:any){
     return this.http.post("http://localhost:3000/posts",data).pipe(map((res)=>{
       return res;
     }))
  }


  //delete order data
  deleteDataApi(id:any){
    return this.http.delete("http://localhost:3000/posts/"+id).pipe(map((res)=>{
      return res;
    }))
  }

  //update orderData
  updateDataApi(id:any,data:any){
    return this.http.patch("http://localhost:3000/posts/"+id,data).pipe(map((res)=>{
      return res;
    }))
  }
}
