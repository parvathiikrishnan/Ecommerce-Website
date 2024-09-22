import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = ""
  password: string = ""
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(){
    console.log("called ")
    if(this.username == "admin" && this.password == "password"){
      console.log("Logged in")
      this.router.navigate(['product']);
    }

    else{
      console.log("Email", this.username)
      console.log("Password", this.password)
      console.log("invalid credentials")
    }
  }

}
