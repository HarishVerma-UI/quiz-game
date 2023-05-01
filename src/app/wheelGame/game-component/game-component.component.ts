import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel';
import { commonModel } from '../common/commonModel';
import { nameClass } from '../common/nameClass';
import { questionClass } from '../common/questionClass';
import { commonGameUtilityCollectionClass } from '../common/myclass';

@Component({
  selector: 'app-game-component',
  templateUrl: './game-component.component.html',
  styleUrls: ['./game-component.component.scss']
})
export class GameComponentComponent implements OnInit {

  title = 'wheel-game';
  @ViewChild(NgxWheelComponent, { static: false }) wheel: any;

  idToLandOn: any;

  wheelContentItems: any[] = [];

  textOrientation: TextOrientation = TextOrientation.HORIZONTAL;
  textAlignment: TextAlignment = TextAlignment.OUTER;
  data: commonModel[] = [];

  namedata: nameClass;
  questionData:questionClass;
  notRepeatQuestion:boolean = true;
  questionToDisplay:string="";

  // Loads the tick audio sound in to an audio object.
  audio = new Audio('http://192.168.1.37:8081/tick1.mp3');
  isQuestionVisible: boolean=false;

  constructor() {
    this.namedata = new nameClass();
    this.questionData = new questionClass();
  }

  ngOnInit(): void {
    this.prepareWheel();
  }

  prepareWheel() {
    const colors = ['#FF0000', '#000000'];
    this.wheelContentItems = this.namedata.collection.map((value) => ({
      fillStyle: colors[value.id % 2],
      text: `${value.value}`,
      id: value.id - 1,
      textFillStyle: 'white',
      textFontSize: '16',
    }))
  }

  ConvertStringToArray(text: string): commonModel[] {
    let x = text.split(";").filter(m => m !== "");
    let array: commonModel[] = [];
    for (let i = 1; i <= x.length; i++) {
      array.push({ id: i, value: x[i - 1] });
    }

    return array;
  }

  async spinWheel() {

    let prize: number = Math.floor(Math.random() * this.namedata.collection.length);
    this.reset();
    await this.spin(prize);

  }

  reset() {
    this.wheel.reset();
  }
  before() {
    this.isQuestionVisible = false;
  }

  async spin(prize: any) {
    this.idToLandOn = prize;
    await new Promise((resolve) => setTimeout(resolve, 1));
    this.wheel.spin();
    await this.playSound();
  }


  async playSound() {
    // This function is called when the sound is to be played.
    // Stop and rewind the sound if it already happens to be playing.
    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio.loop = true;

    const audioClipDuration = 600;
    this.audio.loop = true;
    let playCount = 6;
    setTimeout(() => this.audio.loop = false, (audioClipDuration * (playCount - 1)));
    this.audio.play();
  }

  after() {
    this.namedata.collection.splice(this.idToLandOn, 1);
    this.reorderCollectionIndex(this.namedata);
    this.prepareWheel();
    this.displayQuestion();
  }

  private reorderCollectionIndex(collection:commonGameUtilityCollectionClass) {
    for (let i = 0; i < collection.collection.length; i++) {
      collection.collection[i].id = i + 1;
    }
  }

  displayQuestion(){
    let index = Math.floor(Math.random() * this.questionData.collection.length);
    confirm(this.questionData.collection[index].value);
    this.questionToDisplay = this.questionData.collection[index].value;
    this.isQuestionVisible = true;
    if(this.notRepeatQuestion) this.questionData.collection.splice(index, 1);
    this.reorderCollectionIndex(this.questionData);
    if(this.questionData.collection.length-1===0) alert("Last Question Left. Enter more fun!!");
    if(this.questionData.collection.length===0) alert("No Question Left. Game Will Over!");
  }

  displayNameSection(id:string){
    var name = document.getElementById('#nameSection');
    if (name!==null) name.style.display = 'none';
    var ques = document.getElementById('#questionSection');
    if (ques!==null) ques.style.display = 'none';

    var element = document.getElementById(id);
    console.log(element);
    if (element!==null) element.style.display = 'block';
  }

  //#region QuestionOperations
  public inputQuestion: string = "";
  public inputQuestionId: number = -1;
  public questionList: questionClass = new questionClass;
  
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

  //#region namesOperation
  public inputName: string = "";
  public inputNameId: number = -1;
  public namesList: nameClass = new nameClass;

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

  
  private resetForm() {
    this.inputQuestion = "";
    this.inputQuestionId = -1;

    this.inputName = "";
    this.inputNameId = -1;
  }

}
