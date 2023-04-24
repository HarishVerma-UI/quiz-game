import { Component, OnInit } from '@angular/core';
import { questionModel } from './questionModel';

@Component({
  selector: 'app-management-component',
  templateUrl: './management-component.component.html',
  styleUrls: ['./management-component.component.scss']
})
export class ManagementComponentComponent implements OnInit {
public questionList: questionModel[] = [];
  public inputId: any = null;
  public inputQuestion: string = "";

  saveQuestion() {
    let newQuestion = { id: this.inputId, question: this.inputQuestion };
    if (!this.alreadyExist(newQuestion)) {
      this.questionList.push({ id: this.inputId !== null ? this.inputId : this.getNextId(), question: this.inputQuestion });
    }
    else {
      this.updateQuestionList(newQuestion);
    }

    this.resetForm();
  }

  updateQuestionList(question: questionModel) {
    this.questionList[this.findIndex(question)] = question;
  }

  deleteQuestion(ques: questionModel) {
    var index = this.findIndex(ques);
    this.questionList.splice(index, 1);
    this.reorderQuestionId();
  }

  editQuestion(ques: questionModel) {
    this.inputQuestion = ques.question;
    this.inputId = ques.id;
  }

  private getNextId(): number {
    if (this.questionList.length - 1 < 0) return 1;

    return this.questionList[this.questionList.length - 1].id + 1;
  }

  private alreadyExist(obj: questionModel): boolean {
    if (this.findIndex(obj) === -1) return false;
    return true;
  }

  private findIndex(obj: questionModel) {
    return this.questionList.findIndex(q => q.id === obj.id || q.question === obj.question);
  }

  private resetForm() {
    this.inputQuestion = "";
    this.inputId = null;
  }

  private reorderQuestionId() {
    for (let i = 0; i < this.questionList.length; i++) {
      this.questionList[i].id = i + 1;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
