import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  usersData:any;
  RegisterFormData!:FormGroup;
  constructor(private http:HttpClient,private formbuilder:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.RegisterFormData=this.formbuilder.group({
      name:[''],
      address:[''],
      email:[''],
      password:[''],
    
    })
  }
  
  RegisterSubmit(){
  console.log(this.RegisterFormData.value)
    this.http.post("http://localhost:3000/users",this.RegisterFormData.value).subscribe((res:any)=>{
      alert("Register Done !!!")
      this.RegisterFormData.reset();
      this.router.navigate(['/login']);
     
    },err=>{
      alert("error while register")
    })

  }
}
