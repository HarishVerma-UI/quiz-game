import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { questionModel } from '../management-component/questionModel';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  // private dummy: questionModel[] = [];
  // private sharedNameArray: Subject<questionModel[]> = new Subject();
  // sharedNameArray$: Observable<questionModel[]> = this.sharedNameArray.asObservable();
  // nameKey: string = "name";
  // questionKey: string = "question";

  save(key:string, value:string){
    this.removeData(key);
    this.saveData(key, value);
  }

  getQuestions(){
    return this.getData
  }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    return localStorage.getItem(key)
  }
  
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  
  // getNames(){
  //   return this.getData(this.nameKey);    
  // }

  // setData(updatedData: questionModel[]) {
  //   console.log("saving data");
  //   let localData = localStorage.getItem(this.nameKey);

  //   if (localData === null || (localData != null && updatedData != null)) {
  //     this.sharedNameArray.next(updatedData);
  //     let localStorageValue = this.ConvertQuestionModelArrayToString(updatedData);
  //     this.removeData(this.nameKey);
  //     this.saveData(this.nameKey, localStorageValue);
  //     console.log("if part");
  //   } else {
  //     this.sharedNameArray.next(this.ConvertStringToQuestionModelArray(localData));
  //     console.log("else part");
  //   }
  // }

  
  // getServiceData(): questionModel[] {
  //   let d = this.getData(this.nameKey);
  //   if (d === null) return this.dummy;

  //   return this.ConvertStringToQuestionModelArray(d);
  // }
  

  // ConvertStringToQuestionModelArray(text: string) {
  //   let x = text.split(";").filter(m=>m!=="");
  //   let questionModelArray: questionModel[] = [];
  //   for (let i = 1; i <= x.length; i++) {
  //     questionModelArray.push({ id: i, question: x[i - 1] });
  //   }
  //   //console.log(questionModelArray);
  //   return questionModelArray;
  // }

  // ConvertQuestionModelArrayToString(list: questionModel[]): string {
  //   let returnValue: string = " ";
  //   list.forEach(element => {
  //     //console.log(element.question);
  //     returnValue = returnValue.concat(element.question + ";");
  //   });
  //   //console.log(returnValue);
  //   return returnValue;
  // }

  constructor() { }
}
