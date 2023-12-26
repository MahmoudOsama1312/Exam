import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}
  user = new Subject();

  createStudent(model: any) {
    return this._HttpClient.post("http://localhost:3000/" + "students", model); //do not forget the ( return )
  }

  getAllEmails(typeOfPerson: any) {
    return this._HttpClient.get("http://localhost:3000/" + typeOfPerson);
  }

  login(model: any) {
    return this._HttpClient.put("http://localhost:3000/" + "login/1", model);
  }

  getUserInfo() {
    return this._HttpClient.get("http://localhost:3000/" + "login/1");
  }
}
