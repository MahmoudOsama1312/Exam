import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { DoctorService } from "../../services/doctor.service";

@Component({
  selector: "app-new-exam",
  templateUrl: "./new-exam.component.html",
  styleUrls: ["./new-exam.component.scss"],
})
export class NewExamComponent implements OnInit {
  name = new FormControl("", [Validators.required]);
  subjName: any;
  numOfQuestions = new FormControl("", [
    Validators.required,
    Validators.max(15),
    Validators.min(2),
  ]);
  questNums: any;
  form!: FormGroup;
  questions: any[] = [];
  correctChoice: any;
  subjNameCompletion: boolean = false;
  questionsCompletion: boolean = false;
  id: any;

  constructor(private _FormBuilder: FormBuilder,private _DoctorService: DoctorService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this._FormBuilder.group({
      question: ["", Validators.required],
      answer1: ["", Validators.required],
      answer2: ["", Validators.required],
      answer3: ["", Validators.required],
      answer4: ["", Validators.required],
    });
  }

  createQuestion() {
    if (this.correctChoice) {
      const model = {
        question: this.form.value.question,
        answer1: this.form.value.answer1,
        answer2: this.form.value.answer2,
        answer3: this.form.value.answer3,
        answer4: this.form.value.answer4,
        correctAnswer: this.form.value[this.correctChoice],
      };
      this.questions.push(model);
      this.form.reset();
    } else {
      alert("You Should Choose The Correct Answer ");
    }
  }

  done() {
    const model = {
      name: this.subjName,
      questNums: this.questNums,
      questions: this.questions,
    };
    if (!this.questionsCompletion) {
      this._DoctorService.done(model).subscribe((res: any) => {
        this.questionsCompletion = true;
        this.id = res.id;
      });
    }
  }

  getRadioValue(event: any) {
    this.correctChoice = event.value;
  }

  onSubmit() {
    this.createQuestion();
  }

  subjectNameSubmit() {
    if (!this.name.value || !this.numOfQuestions.value) {
      alert(" Please Fill all the fields");
    } else {
      this.subjName = this.name.value;
      this.questNums = this.numOfQuestions.value;
      this.subjNameCompletion = true;
    }
  }

  clearForm() {
    this.form.reset();
  }

  cancel() {
    this.form.reset();
    this.questions = [];
    this.subjName = "";
    this.subjNameCompletion = false;
  }

  deleteQuestion(index: number) {
    //steps for deleting :  1- delete from the questions array . 2- override on the database with empty
    this.questions.splice(index, 1);
    console.log(index);
    const model = {
      name: this.subjName,
      questNums: this.questNums,
      questions: this.questions,
    };
    this._DoctorService.updateSubject(model, this.id).subscribe((res: any) => {
      alert("The Question is Deleted Successfully");
    });
  }
}
