import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../../Core/services/note.service';
import { jwtDecode } from 'jwt-decode';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-note-data',
  templateUrl: './note-data.component.html',
  styleUrl: './note-data.component.css'
})
export class NoteDataComponent implements OnInit{
formData!:FormGroup;
userData:any;
token:any = localStorage.getItem('userToken');
constructor(
  private _fb:FormBuilder,
  private _note:NoteService,
  private _matDialogRef:MatDialogRef<NoteDataComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any

){}


  ngOnInit(): void {
    this.CreateForm();
    this.userData = jwtDecode(this.token);

    
  }

  CreateForm(): void{

this.formData = this._fb.group({
  title:[this.data? this.data.note.title:'',[Validators.required]],
  desc:[this.data? this.data.note.desc:'',[Validators.required]],
  token:this.token
})

  }

  sendData(): void{
if(this.formData.valid){


if(this.data ===null){
  this.addNote()
}else{
this.updateNote()
}


}

  }

  addNote(): void{
    const data ={
      ...this.formData.value,
      citizenID:this.userData._id
    }

   
    
    this._note.addNote(data).subscribe({
      next:(res:any)=>{
       
        if(res.message==='success'){
          this._matDialogRef.close("add");
        }
      }
    })
  }

  updateNote():void{
    const model ={
      ...this.formData.value,
      NoteID:this.data.note._id,
      token:this.token
    }
    this._note.updateNote(model).subscribe({
      next:(res)=>{
       
        if(res.message==="updated"){
          this._matDialogRef.close("updated")
        }
      }
    })
  }

}
