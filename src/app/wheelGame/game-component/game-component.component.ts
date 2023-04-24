import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';
import { questionModel } from '../management-component/questionModel';

@Component({
  selector: 'app-game-component',
  templateUrl: './game-component.component.html',
  styleUrls: ['./game-component.component.scss']
})
export class GameComponentComponent implements OnInit {
  data: questionModel[] = [];

  constructor(private service: GameService = new GameService()) { }

  ngOnInit(): void {
    console.log("gamecomponent loaded");
    this.service.sharedNameArray$
      .subscribe(sharedNameArray => this.data = sharedNameArray);
    this.getData();
    console.log(this.data);
  }

  getData() {
    this.data = this.service.getServiceData();
  }
}
