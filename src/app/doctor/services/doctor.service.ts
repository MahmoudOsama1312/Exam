import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private _HttpClient: HttpClient) {}

  done(model:any) {
    return this._HttpClient.post("http://localhost:3000/"+'subjects', model)
  }

  updateSubject(model:any , id:any) {
    return this._HttpClient.put("http://localhost:3000/"+"subjects/"+id , model)
  }

  getAllSubjects() {
    return this._HttpClient.get("http://localhost:3000/"+'subjects')
  }

  deleteSubj(id: any) {
    return this._HttpClient.delete("http://localhost:3000/"+'subjects/'+id)
  }

  getSubjById(id: number) {
    return this._HttpClient.get("http://localhost:3000/"+'subjects/'+id)
  }

  getStudentById(id: number) {
    return this._HttpClient.get("http://localhost:3000/"+'students/'+id)
  }

  updateStudent(id:number , model:any) {
    return this._HttpClient.put("http://localhost:3000/"+'students/'+id , model)
  }



}
