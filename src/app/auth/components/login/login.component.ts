import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  doctorEmail: any;
  type: string = "students"; // i want it to be the default value
  allEmails: any[] = [];
  constructor(private _FormBuilder: FormBuilder,private _AuthService: AuthService,private _Router: Router) {}

  ngOnInit(): void {
    this.createForm();
    this.getData();
    this.getUserInfo();
  }

  createForm() {
    this.form = this._FormBuilder.group({
      type: [this.type],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  radioButton(event: any) {
    this.type = event.value;
    this.getData();
  }

  getData() {
    this._AuthService.getAllEmails(this.type).subscribe((res: any) => {
      this.allEmails = res;
    });
  }

  onSubmit() {
    const { type, email, password } = this.form.value;
    const user = this.allEmails.find(
      (item) => item.email === email && item.password === password
    );
    if (user) {
      // Successful login, you found a matching email and password in the data
      const model = {
        username: user.username,
        type: this.type,
        userId: user.id,
      };
      this._AuthService
        .login(model)
        .subscribe((x: any) => this._AuthService.user.next(x)); // this to load the data in navbar to use it
      alert(`Welcome ${model.username}`);
      this._Router.navigate(["subjects"]);
    } else {
      alert("This Email does not Exist or the password is incorrect.");
    }
  }

  getUserInfo() {
    this._AuthService.getUserInfo().subscribe((res: any) => {
      this._AuthService.user.next(res); // to give the user [ new Subject]  the new data .
    });
  }
}
