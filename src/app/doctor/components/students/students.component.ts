import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/services/auth.service";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.scss"],
})
export class StudentsComponent implements OnInit {
  dataSource: any;
  displayedColumns: any;
  tabledata: any;

  constructor(private _AuthService: AuthService) {
    this.displayedColumns = ["position", "name", "subject", "degree"];
  }

  ngOnInit(): void {
    this.getStudentInfo();
  }

  getStudentInfo() {
    this._AuthService.getAllEmails("students").subscribe((res: any) => {
      console.log(res);
      this.dataSource = res?.map((student: any) => {
        if (student?.subjects) {
          return student?.subjects.map((subj: any) => {
            return {
              name: student?.username,
              subjects: subj?.name,
              degree: subj?.degree,
            };
          });
        } else {
          return [
            {
              name: student?.username,
              subjects: "-",
              degree: "-",
            },
          ];
        }
      });
      this.tabledata = [];

      this.dataSource.forEach((element: any) => {
        element.forEach((subItem: any) => {
          this.tabledata.push({
            name: subItem.name,
            subjects: subItem.subjects,
            degree: subItem.degree,
          });
        });
      });
    });
  }
}
