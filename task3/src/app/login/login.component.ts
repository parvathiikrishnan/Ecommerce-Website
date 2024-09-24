import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { RequestAPIService } from '../request-api.service';
import Swal from 'sweetalert2/dist/sweetalert2.js' //do npm install first and include cdn in index.html

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup
  username: string = ""
  password: string = ""
  
  constructor(private router: Router, private fb: FormBuilder, private RequestService: RequestAPIService,) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  onLogin(){
    console.log("called ")
  

      if(this.userForm.valid){
        let params = {
          username: this.userForm.value.username,
          password: this.userForm.value.password
        }
    
        this.RequestService.createToken(params).subscribe(response => {
          console.log("Received this : ", response);
          this.router.navigate(['product']);
  
          
        },
        (error) => {
          console.error('Error logging in:', error)
          // alert('Username and password are invalid. Please try again.');
          Swal.fire({
            title: 'Error!',
            text: 'Username and password are invalid. Please try again.',
            icon: 'error',
            confirmButtonText: 'Try again'
          })
  
          this.userForm.reset()
        }
      );

      }
  }

}
