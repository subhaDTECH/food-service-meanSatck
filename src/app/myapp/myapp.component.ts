import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { OrderDataModel} from "./myapp.model"
@Component({
  selector: 'app-myapp',
  templateUrl: './myapp.component.html',
  styleUrls: ['./myapp.component.css']
})
export class MyappComponent implements OnInit {
  formData!:FormGroup;
  OrderData:OrderDataModel=new OrderDataModel();
  AllData:any;
  userLogin:any;
  localStorage: Storage;
  constructor(private formbuilder:FormBuilder,private api:ApiService,private router:Router) { 
    this.localStorage   = window.localStorage;
  }

  ngOnInit(): void {
    this.formData=this.formbuilder.group({
      name:[''],
      order:[''],
      phone:[''],
      address:[''],
      email:['']

    })

  this.getData();
   

  }


//get allorder data
getData(){
 
  this.userLogin=localStorage.getItem('user');
  console.log(this.userLogin)
  if(!this.userLogin) this.router.navigate(['/login']);
  this.api.getDataApi().subscribe((res)=>{
    this.AllData=res;
  })
  

}
//logoutUser
logOut(){
  localStorage.setItem("user","");
  this.router.navigate(['/login'])
}

//delete data
deleteData(id:any){
   this.api.deleteDataApi(id).subscribe((res:any)=>{
     this.getData();
     alert("Order Deleted successfully 😄");
   },err=>{
     alert("error while delete data")
   });
 }

//edit order data
EditOrder(data:any){
    this.OrderData.id=data.id;
     this.formData.controls['name'].setValue(data.name);
     this.formData.controls['order'].setValue(data.order);
     this.formData.controls['phone'].setValue(data.phone);
     this.formData.controls['address'].setValue(data.address);
     this.formData.controls['email'].setValue(data.email);


     //get new update form data into model 
}

EditData(){
 
  this.OrderData.name=this.formData.value.name;
  this.OrderData.order=this.formData.value.order;
  this.OrderData.phone=this.formData.value.phone;
  this.OrderData.address=this.formData.value.address;
  this.OrderData.email=this.formData.value.email;


  //call update api
  this.api.updateDataApi(this.OrderData.id,this.OrderData).subscribe((res:any)=>{
    this.getData();
    this.formData.reset();
    alert("Order updated successfully ❤️")
  },err=>{
    alert("error while update order data")
  })

}

  //post order data
  formSubmit(){
    console.log("click")
    console.log(this.formData.value)
  
    this.OrderData.name=this.formData.value.name;
    this.OrderData.order=this.formData.value.order;
    this.OrderData.phone=this.formData.value.phone;
    this.OrderData.address=this.formData.value.address;
    this.OrderData.email=this.formData.value.email;

    //send data
    this.api.postDataApi(this.OrderData).subscribe((res:any)=>{
      alert("Order made successfully 😄😄😄");
      this.getData();
      this.formData.reset();
    },err=>{
       alert("error while post data")
    });

   

  }





}
