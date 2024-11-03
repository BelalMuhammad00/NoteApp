import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { signal} from '@angular/core';
import { AuthService } from '../../Core/services/auth.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  FormRegister!:FormGroup


createForm():void{
  this.FormRegister=this._fb.group({
    first_name:['',[Validators.required]],
    last_name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    age:['',[Validators.required]],
  })
}
/**
 *
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

register(formData:FormGroup):void{

  if(formData.valid){
    this._auth.register(formData.value).subscribe({
      next:(response)=>{
        if(response.message==="success"){
         this._Router.navigate(['/login'])
        }else{
          this._toastr.warning(response.message,"Error");
        }
        console.log(response);
      },
    })
  }


}
}
