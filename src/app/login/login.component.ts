import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormData!:FormGroup;
  usersData:any;
  findUser:any;
  constructor(private formbuilder:FormBuilder,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.loginFormData=this.formbuilder.group({
       email:[''],
       password:['']
    })
    this.checkLogin();
  }
  //caheck login
  checkLogin(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }

  loginSubmit(){
    console.log( this.loginFormData.value);
    this.http.get('http://localhost:3000/users').subscribe((res:any)=>{
      
    this.findUser=res.find((user:any)=>{
       if( user.email===this.loginFormData.value.email 
        && user.password===this.loginFormData.value.password){
          return user;
        }
    });
    console.log(this.findUser)
    if( this.findUser.name){
      alert("Login successfull !!!");
      localStorage.setItem("user",JSON.stringify(this.findUser));
      this.router.navigate(['/']);

   }else{
     alert("Invalid password or email")
   }
 
  

    })
  }

}
