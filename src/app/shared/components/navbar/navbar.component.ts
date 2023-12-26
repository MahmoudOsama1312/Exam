import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user:any = null;
  constructor( private _AuthService:AuthService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this._AuthService.user.subscribe((res: any) => {    // we made subscribe to the (user) bcz its is a new Subject()  [rjx]
      if (res.type) {     // i say here , if there is a role in the Database Ojbect ( b check bel role msh bel id)
        this.user = res
         console.log(this.user)
      }

    })
  }

  logout() {
    const model = {}
    this._AuthService.login(model).subscribe((res: any) => {
      this.user = null
      this._AuthService.user.next(res)   // to update the user
    })
  }
}
