import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { questionModel } from '../management-component/questionModel';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private dummy: questionModel[] = [];
  private sharedNameArray: Subject<questionModel[]> = new Subject();
  sharedNameArray$: Observable<questionModel[]> = this.sharedNameArray.asObservable();
  key: string = "questions";

  setData(updatedData: questionModel[]) {
    console.log("saving data");
    let localData = localStorage.getItem(this.key);

    if (localData === null || (localData != null && updatedData != null)) {
      this.sharedNameArray.next(updatedData);
      let localStorageValue = this.ConvertQuestionModelArrayToString(updatedData);
      this.removeData(this.key);
      this.saveData(this.key, localStorageValue);
      console.log("if part");
    } else {
      this.sharedNameArray.next(this.ConvertStringToQuestionModelArray(localData));
      console.log("else part");
    }


    console.log(updatedData);
  }

  getServiceData(): questionModel[] {
    let d = this.getData(this.key);
    if (d === null) return this.dummy;

    return this.ConvertStringToQuestionModelArray(d);
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

  ConvertStringToQuestionModelArray(text: string) {
    let x = text.split(";");
    let questionModelArray: questionModel[] = [];
    for (let i = 1; i <= x.length; i++) {
      questionModelArray.push({ id: i, question: x[i - 1] });
    }
    console.log(questionModelArray);
    return questionModelArray;
  }

  ConvertQuestionModelArrayToString(list: questionModel[]): string {
    let returnValue: string = " ";
    list.forEach(element => {
      console.log(element.question);
      returnValue = returnValue.concat(element.question + ";");
    });
    console.log(returnValue);
    return returnValue;
  }

  constructor() { }
}
