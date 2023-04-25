import { Component, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../service/game.service';
import { questionModel } from '../management-component/questionModel';
import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel';
import { commonModel } from '../common/commonModel';

@Component({
  selector: 'app-game-component',
  templateUrl: './game-component.component.html',
  styleUrls: ['./game-component.component.scss']
})
export class GameComponentComponent implements OnInit {

  title = 'wheel-game';
  @ViewChild(NgxWheelComponent, { static: false }) wheel: any;

  //seed = [...Array(12).keys()];
  idToLandOn: any;

  items: any[] = [];

  textOrientation: TextOrientation = TextOrientation.HORIZONTAL;
  textAlignment: TextAlignment = TextAlignment.OUTER;
  data: commonModel[] = [];

  constructor(private service: GameService = new GameService()) { }

  ngOnInit(): void {
    console.log("gamecomponent loaded");
    // this.service.sharedNameArray$
    //   .subscribe(sharedNameArray => this.data = sharedNameArray);
    this.getData();
    // initiation of wheel
    this.idToLandOn = Math.floor(Math.random() * this.data.length);
    const colors = ['#FF0000', '#000000'];
    this.items = this.data.map((value) => ({
      fillStyle: colors[value.id % 2],
      text: `Prize ${value.value}`,
      id: value.id-1,
      textFillStyle: 'white',
      textFontSize: '16',
    }))
}

  getData() {
    // this.data = this.service.getServiceData();
    let d = this.service.getNames();

    if(d!==null) this.data = this.ConvertStringToArray(d);
  }

  ConvertStringToArray(text: string):commonModel[] {
    let x = text.split(";").filter(m => m !== "");
    let array: commonModel[] = [];
    for (let i = 1; i <= x.length; i++) {
        array.push({ id: i, value: x[i - 1] });
    }

    return array;
}

  async spinWheel(){
    
    let prize:number = Math.floor(Math.random() * this.data.length);
    console.log(prize);
    this.reset();
    await this.spin(prize);
    
  }

  reset() {
    this.wheel.reset();
  }
  before() {
    console.log("before spinning wheel");
    //alert('Your wheel is about to spin');
  }

  async spin(prize: any) {
    console.log("in spin : " + prize);
    this.idToLandOn = prize;
    await new Promise((resolve) => setTimeout(resolve, 1));
    this.wheel.spin();
  }

  after() {
    console.log("You won prize : " + this.idToLandOn);
    //alert('You have been bamboozled');
  }
}
