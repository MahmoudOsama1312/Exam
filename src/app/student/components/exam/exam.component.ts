import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DoctorService } from 'src/app/doctor/services/doctor.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  constructor(private _ActivatedRoute : ActivatedRoute , private _DoctorService : DoctorService , private _AuthService:AuthService) { }      // we need to Catch the id ( param ) from the url
  id: any;
  info: any;
  selectedSubject:any
  total: number = 0
  showResult: boolean = false
  LoggedInInfo: any
  usersSubject: any[] = []
  examValidation: boolean = false

  ngOnInit(): void {
    this.catchSubjectId()
    this.getSubjById()
    this.getLoggedInTypeAndId()

  }

  catchSubjectId() {
    this.id = this._ActivatedRoute.snapshot.paramMap.get('id')
  }

  getSubjById() {
    this._DoctorService.getSubjById(this.id).subscribe((res: any) => {
      this.selectedSubject =res
    })
  }

   getLoggedInTypeAndId() {
    this._AuthService.getUserInfo().subscribe((res: any) => {   // this get the Login-er  Info
      this.info = res
      console.log(this.info)
      this.getLoggedInData()
    })
   }

  getLoggedInData() {
    this._DoctorService.getStudentById(this.info.userId).subscribe((res: any) => {
      this.LoggedInInfo = res
      console.log(this.LoggedInInfo)
      this.usersSubject = res?.subjects ? res?.subjects : []    // tricky  ( these subjects in the beginning is not exist)
      console.log(this.usersSubject)
      this.checkExam()
    })
  }

  deleteQuestion(index: number) {  //steps for deleting :  1- delete from the questions array . 2- override on the database with empty
    this.selectedSubject.questions.splice(index,1)
      const model = {
        name: this.selectedSubject.name,
        questions: this.selectedSubject.questions
      }
    this._DoctorService.updateSubject(model, this.id).subscribe((res: any) => {
      alert("The Question is Deleted Successfully")
      })
    }

  studentAnswer(event: any) {
    let selectedAnswer = event.value
    let questionIndex = event.source.name    // console.log the event to see this
    console.log(questionIndex)
    this.selectedSubject.questions[questionIndex].studentChoice = selectedAnswer // pushed the selected answer to the quest arr
  }

  getResult() {
    this.total = 0   // to reset the total every time
    for (let i in this.selectedSubject.questions) {
      if (this.selectedSubject.questions[i].studentChoice == this.selectedSubject.questions[i].correctAnswer) {
        this.total++
      }
    }
    this.showResult = true;
    //============================================= Another Operation
    this.usersSubject.push({name: this.selectedSubject.name, id: this.id , degree: this.total})

    let model = {
      username: this.LoggedInInfo.username,
      email: this.LoggedInInfo.email,
      password: this.LoggedInInfo.password,
      subjects: this.usersSubject
    }

    this._DoctorService.updateStudent(this.LoggedInInfo.id, model).subscribe((res: any) => {
      alert("Success")
    })
  }

  checkExam() {
    for (let x in this.usersSubject) {
      if (this.usersSubject[x]?.id == this.id) {
        this.examValidation = true
      }
      }
    }
  }
