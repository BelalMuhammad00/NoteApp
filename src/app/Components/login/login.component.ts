import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  Formlogin!:FormGroup


createForm():void{
  this.Formlogin=this._fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]]

  })
}
/**
 */




constructor(private _fb:FormBuilder , private _auth:AuthService, private _Router:Router ,private _toastr: ToastrService) {}
  ngOnInit(): void {
    this.createForm();
  }


  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

login(formData:FormGroup):void{

  if(formData.valid){
    this._auth.login(formData.value).subscribe({
      next:(response)=>{
        if(response.message==="success"){
        localStorage.setItem('userToken',response.token);
this._auth.userData()
this._Router.navigate(['/home']);

       
        }else{
          this._toastr.warning(response.message,"Error");
        }
      
      },
    })
  }


}
}
