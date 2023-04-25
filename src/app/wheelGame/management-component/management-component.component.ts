import { Component, OnInit } from '@angular/core';
import { questionModel } from './questionModel';
import { GameService } from '../service/game.service';
import { commonGameUtilityCollectionClass } from '../common/myclass';
import { nameClass } from '../common/nameClass';
import { commonModel } from '../common/commonModel';

@Component({
  selector: 'app-management-component',
  templateUrl: './management-component.component.html',
  styleUrls: ['./management-component.component.scss']
})
export class ManagementComponentComponent implements OnInit {
public questionList: questionModel[] = [];
  public inputId: any = null;
  public inputQuestion: string = "";
  public namesList:nameClass;

  public inputName:string = "";
  public inputNameId:number = -1;

  saveQuestion() {
    // this.namesList.push(this.inputQuestion);
    // console.log(this.namesList.names);
    let newQuestion = { id: this.inputNameId, value: this.inputName };
    if ( this.inputNameId === -1) {
      this.namesList.push(this.inputName);
      this.namesList.updateService();
      console.log("if" + this.namesList.collection);
      
      // this.questionList.push({ id: this.inputId !== null ? this.inputId : this.getNextId(), question: this.inputQuestion });
    }
    else {
      this.namesList.update({ id: this.inputNameId, value: this.inputName });
      this.namesList.updateService();
      console.log(this.namesList.collection);

      // this.updateQuestionList(newQuestion);
    }

    this.resetForm();

    // this.service.setData(this.questionList);
  }

  updateQuestionList(question: questionModel) {
    this.questionList[this.findIndex(question)] = question;
  }

  deleteName(name: commonModel) {
    this.namesList.delete({id:name.id, value:name.value});
    }

  deleteQuestion(ques: questionModel) {
    var index = this.findIndex(ques);
    this.questionList.splice(index, 1);
    this.reorderQuestionId();
  }

  editName(name:commonModel){
    this.inputName = name.value;
    this.inputNameId = name.id;
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

    this.inputName = "";
    this.inputNameId = -1;
  }

  private reorderQuestionId() {
    for (let i = 0; i < this.questionList.length; i++) {
      this.questionList[i].id = i + 1;
    }
  }

  constructor(private service:GameService = new GameService()) {
    this.service.sharedNameArray$
    .subscribe(sharedNameArray => this.questionList = sharedNameArray);

    this.namesList = new nameClass();
   }

  ngOnInit(): void {
  }

}
