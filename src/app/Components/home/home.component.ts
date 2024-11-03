import { Component, OnInit } from '@angular/core';
import {ChangeDetectionStrategy,inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { NoteDataComponent } from '../note-data/note-data.component';
import { NoteService } from '../../Core/services/note.service';
import { AuthService } from '../../Core/services/auth.service';
import { Notes } from '../../Core/notes';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
 
Notes:any[]=[];
value= '';

constructor(private dialog:MatDialog,private _Note:NoteService,private _auth:AuthService) {
}
  ngOnInit(): void {
   this.getNotes();
  }

openDialog() {
  const dialogRef = this.dialog.open(NoteDataComponent);

  dialogRef.afterClosed().subscribe({
    next:(res)=>{
      if(res==="add"){
        this.getNotes();
      }
    }
  });
}

getNotes(): void{
const model = {
  token:localStorage.getItem('userToken'),
  userID:this._auth.user.getValue()._id
}


this._Note.getNotes(model).subscribe({
  next:(res)=>{ 
    if(res.message==="success"){
      this.Notes=res.Notes 
    }

  }
})
}

setData(note:any):void{
const MatDialogRef=this.dialog.open(NoteDataComponent,{
  data:{note}
});

MatDialogRef.afterClosed().subscribe({
  next:(res)=>{
    if(res==='updated'){
      this.getNotes();

    }
  }
})
}

deleteNote(id:string,index:number):void{
const model= {
  NoteID:id,
  token:localStorage.getItem('userToken')
}

this._Note.deletNote(model).subscribe({
  next:(res)=>{
    if(res.message==="deleted"){
this.Notes.splice(index,1);
this.Notes =[...this.Notes];
    }
    
  }
})
 
  
}

}
