import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel';
import { Howl } from 'howler';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss'],
})
export class StartGameComponent implements OnInit {
  @ViewChild(NgxWheelComponent, { static: false }) wheel!: NgxWheelComponent;
  @ViewChild('container') container!: ElementRef;

  names = [
    'Ro Sieben',
    'Nathan Samsoedien',
    'Danny Hegeraad',
    'Bert Kuipers',
    'Kaushik Sakala',
    'Bharatgouda Police Patil',
    'Akshay Kumar',
    'Eduard Nijensteen',
    'Eric Edelenbos',
    'Palvi Jojra',
    'Eldin Hulsman',
    'Lex Goudriaan',
    'Kenneth Mensink',
    'Jake van der Valk',
    'Leo Schilperoort',
    'Daan Bertens',
    'Frank van Driel',
    'Arris Tijsseling',
    'Vishnu Vishweshwar',
    'Bineet Kumar Singh',
    'Harish Kumar Verma',
    'Pratibha Basapure',
    'Ram Polaggari',
    'Harsha Menda',
    'Rajat Bansal',
    'Angan Das',
    'Rajarahul Murugesan',
    'Suresh Thimmappa',
    'Ernst de Zwart',
    'Mark van Dijk',
    'Werner van der Meer',
  ];
  colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
    'pink',
    'brown',
    'maroon',
    'navy',
    'teal',
    'olive',
    'gold',
    'silver',
    'bronze',
    'plum',
    'peach',
    'magenta',
    'violet',
    'indigo',
    'turquoise',
    'coral',
    'lavender',
    'sky blue',
    'rose',
    'beige',
    'mustard',
    'cream',
    'khaki',
    'wine',
  ];

  idToLandOn: any;

  items: any[] = [];
  sound = new Howl({
    src: [
      'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3',
    ],
  });

  textOrientation: TextOrientation = TextOrientation.HORIZONTAL;
  textAlignment: TextAlignment = TextAlignment.INNER;
  randomQuestion!: string;
  selectedName!: string;
  selectedNames: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.idToLandOn = Math.floor(Math.random() * this.names.length);
    this.items = this.names.map((value, index) => ({
      fillStyle: this.colors[index % this.colors.length],
      text: value,
      id: index,
      textFillStyle: 'black',
      textFontSize: '22',
    }));
  }

  reset() {
    this.wheel.reset();
  }

  spin() {
    this.removeName(this.idToLandOn);
    this.wheel.reset();
    this.idToLandOn = Math.floor(Math.random() * this.names.length);
    this.wheel.spin();
    this.randomQuestion = '';
  }

  removeName(idToLandOn: any) {
    const removedName = this.names.splice(idToLandOn, 1)[0];
    this.items = this.names.map((value, index) => ({
      fillStyle: this.colors[index % this.colors.length],
      text: value,
      id: index,
      textFillStyle: 'black',
      textFontSize: '22',
    }));
    this.selectedNames.push(removedName);
    this.selectedName = removedName;
  }

  getRandomQuestion() {
    const questions = [
      'How would you like to work often? - Bed, Chair-table, Couch',
      'How many cups of coffee, tea, or beverage-of-choice do you have each morning?',
      'What`s your favorite way to spend a day off?',
      'What`s one thing you can`t say at work that you wish you could?',
      'How would you spend your days if you had unlimited time and resources?',
      'What was your dream profession growing up?',
      'Sell any one of the following: ',
      'What`s the craziest thing you have ever done?',
      'If you were forced to sing karaoke, what song would you choose and why?',
      'You`re going to sail around the world. What`s the name of your boat?',
      'If I handed you a plane ticket right now to anywhere in the world, where would you go?',
      'If you could choose your age forever, what age would you choose and why?',
      'If you had 25 hours each day, how would you use your extra hour?',
      'If you could be the world`s best athlete in any sport, which one would it be any why?',
      'If you could go back in time and pay more attention in one class, what would it be?',
      'Are you team Android or team Apple and Why?',
      'Would you rather be in a zombie apocalypse or a robot apocalypse?',
      'If you could instantly learn a new talent, what would it be?',
      'Why do people say “slept like a baby” when babies wake up all the time in the middle of the night?',
      'Does the person flying in the middle seat get both armrests?',
      'Match the following images to their names food names and images',
      'What are u better at Writing a buggy code Or Crashing a prod env',
      'sell any one of the following',
      'What will you steel from the following and why? unwashed spoon, used jean, half eaten banana, used toothbrush',
    ];

    const randomIndex = Math.floor(Math.random() * questions.length);
    this.randomQuestion = questions[randomIndex];
  }
  before() {
    this.sound.play();
  }
  after() {
    this.sound.unload();
  }
}
