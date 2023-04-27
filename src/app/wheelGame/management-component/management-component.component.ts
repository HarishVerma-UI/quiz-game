import { Component, OnInit } from '@angular/core';
import { questionModel } from './questionModel';
import { GameService } from '../service/game.service';
import { commonGameUtilityCollectionClass } from '../common/myclass';
import { nameClass } from '../common/nameClass';
import { commonModel } from '../common/commonModel';
import { questionClass } from '../common/questionClass';

@Component({
  selector: 'app-management-component',
  templateUrl: './management-component.component.html',
  styleUrls: ['./management-component.component.scss']
})
export class ManagementComponentComponent implements OnInit {
  // public questionList: questionModel[] = [];
  



  //#region namesOperation
  public inputName: string = "";
  public inputNameId: number = -1;
  public namesList: nameClass;

  saveName() {
    if (this.inputNameId === -1) {
      this.namesList.addNew(this.inputName);
    }
    else {
      this.namesList.edit({ id: this.inputNameId, value: this.inputName });
    }

    this.resetForm();
  }

  editName(name:commonModel){
    this.inputNameId = name.id;
    this.inputName = name.value;
  }

  deleteName(name: commonModel) {
    this.namesList.remove({ id: name.id, value: name.value });
  }
  //#endregion namesOperation

  //#region QuestionOperations
  public inputQuestion: string = "";
  public inputQuestionId: number = -1;
  public questionList: questionClass;
  
  saveQuestion() {
    if (this.inputQuestionId === -1) {
      this.questionList.addNew(this.inputQuestion);
    }
    else {
      this.questionList.edit({ id: this.inputQuestionId, value: this.inputQuestion });
    }

    this.resetForm();
  }

  editQuestion(question: commonModel){
    this.inputQuestionId = question.id;
    this.inputQuestion = question.value;
  }

  deleteQuestion(question: commonModel) {
    this.questionList.remove({ id: question.id, value: question.value });
  }
  //#endregion

  private resetForm() {
    this.inputQuestion = "";
    this.inputQuestionId = -1;

    this.inputName = "";
    this.inputNameId = -1;
  }

  constructor(private service: GameService = new GameService()) {
    this.questionList = new questionClass();
    this.namesList = new nameClass();
  }

  ngOnInit(): void {
  }

}
