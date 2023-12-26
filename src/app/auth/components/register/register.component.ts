import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  allEmails: any[] = [];

  constructor(private _FormBuilder: FormBuilder,private _AuthService: AuthService,private _Router: Router) {}

  ngOnInit(): void {
    this.createForm();
    this.getAllEmails();
  }

  createForm() {
    this.form = this._FormBuilder.group({
      username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
    });
  }

  submit() {
    const model = {
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password,
    };

    // check for Multiple E-mails :
    let index = this.allEmails.findIndex(
      (item) => item.email == this.form.value.email
    ); // result ( -1 : not exist , 0 : exist )
    if (index == -1) {
      this._AuthService.createStudent(model).subscribe((x: any) => {
        alert(`Welcome ${model.username}`);
        const model2 = {
          username: x.username,
          type: "student",
          userId: x.id,
        };
        this._AuthService
          .login(model2)
          .subscribe((x: any) => this._AuthService.user.next(x)); // this to load the data in navbar to use it
        alert(`Welcome ${model.username}`);
        this._Router.navigate(["subjects"]);
      });
      this._Router.navigate(["login"]);
    } else {
      alert("This E-mail is already Exist");
    }
  }

  getAllEmails() {
    // all students
    this._AuthService
      .getAllEmails("students")
      .subscribe((emails: any) => (this.allEmails = emails));
  }
}
