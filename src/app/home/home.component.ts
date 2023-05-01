import { Component, ViewChild } from '@angular/core';
import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel';
import { Howl } from 'howler';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  title = 'wheel-game';
  @ViewChild(NgxWheelComponent, { static: false }) wheel: any;

  seed = [...Array(12).keys()];
  idToLandOn: any;

  items: any[] = [];

  sound = new Howl({
    src: [
      'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3',
    ],
  });

  textOrientation: TextOrientation = TextOrientation.HORIZONTAL;
  textAlignment: TextAlignment = TextAlignment.OUTER;

  ngOnInit() {
    this.idToLandOn = this.seed[Math.floor(Math.random() * this.seed.length)];
    const colors = ['#FF0000', '#000000'];
    this.items = this.seed.map((value) => ({
      fillStyle: colors[value % 2],
      text: `Prize ${value}`,
      id: value,
      textFillStyle: 'white',
      textFontSize: '16',
    }));
  }
  reset() {
    this.wheel.reset();
  }
  before() {
    console.log(this.sound);
    this.sound.play();
  }

  async spin(prize: any) {
    this.idToLandOn = prize;
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.wheel.spin();
  }

  after() {
    console.log(this.wheel.idToLandOn);
    this.sound.unload();
  }
}
