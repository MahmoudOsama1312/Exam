import { Component, OnInit } from "@angular/core";
import { DoctorService } from "../../services/doctor.service";
import { AuthService } from "src/app/auth/services/auth.service";

@Component({
  selector: "app-subjects",
  templateUrl: "./subjects.component.html",
  styleUrls: ["./subjects.component.scss"],
})
export class SubjectsComponent implements OnInit {
  subjects: any[] = [];
  info: any = {};
  selectedSubj: any;
  arr: any[] = [];
  doneSubj: any[] = [];
  degrees: number[] = [];
  constructor(
    private _DoctorServiec: DoctorService,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllSubjets();
    this.getUserType();
  }

  getAllSubjets() {
    this._DoctorServiec.getAllSubjects().subscribe((res: any) => {
      this.subjects = res;
      console.log(this.subjects); // this.subjects.id
      this.subjects.map((x) => console.log(x.id));
    });
  }

  getUserType() {
    this._AuthService.getUserInfo().subscribe((res: any) => {
      // this get the Login-er  Info
      this.info = res;
      console.log(this.info);
      if (this.info.type == "student") {
        this.getStudentById();
      }
    });
  }

  delete(index: number) {
    const id = this.subjects[index].id;
    this.subjects.splice(index, 1);
    this._DoctorServiec.deleteSubj(id).subscribe((res) => {
      alert(`The Selected Subject 0is Deleted Successfully`);
    });
  }

  getStudentById() {
    this._DoctorServiec
      .getStudentById(this.info.userId)
      .subscribe((res: any) => {
        console.log(res);
        res.subjects?.map((subj: any) => {
          this.doneSubj.push(subj.name);
          this.degrees.push(subj.degree);

          console.log(this.doneSubj);
          console.log(this.degrees);
          if (res.subjects) {
            console.log("El User Da Done Lel Subjects");
          } else {
            console.log("lessa haymt7n");
          }
        });
      });
  }
}
