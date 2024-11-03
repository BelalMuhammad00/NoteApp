import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private _http:HttpClient) { }

  addNote(formData:object):Observable<any>{
    return this._http.post(`https://movies-api.routemisr.com/addNote`,formData)
  }

  updateNote(formData:object):Observable<any>{
    return this._http.put(`https://movies-api.routemisr.com/updateNote`,formData)
  }

  getNotes(formData:object): Observable<any>{
    return this._http.post(`https://movies-api.routemisr.com/getUserNotes`,formData)
  }

  deletNote(formData:object): Observable<any>{
    const model = {
      body:formData
    }
    return this._http.delete(`https://movies-api.routemisr.com/deleteNote`,model)
  }
}
