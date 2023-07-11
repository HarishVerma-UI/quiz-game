import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel';
import { Howl } from 'howler';
import { GameServiceApi } from '../wheelGame/service/game-service-api.service';
import { quizData } from '../wheelGame/service/quizData';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss'],
})
export class StartGameComponent implements OnInit {
  @ViewChild(NgxWheelComponent, { static: false }) wheel!: NgxWheelComponent;
  @ViewChild('container') container!: ElementRef;

  names = [
    {
      name: 'Ro Sieben',

      color: 'red',
    },

    {
      name: 'Nathan Samsoedien',

      color: 'orange',
    },

    {
      name: 'Danny Hegeraad',

      color: 'silver',
    },

    {
      name: 'Bert Kuipers',

      color: '#f6b73c',
    },

    {
      name: 'Kaushik Sakala',

      color: 'red',
    },

    {
      name: 'Bharatgouda Police Patil',

      color: '#f6b73c',
    },

    {
      name: 'Akshay Kumar',

      color: 'indigo',
    },

    {
      name: 'Eduard Nijensteen',

      color: 'olive',
    },

    {
      name: 'Eric Edelenbos',

      color: 'violet',
    },

    {
      name: 'Palvi Jojra',

      color: 'gold',
    },

    {
      name: 'Eldin Hulsman',

      color: 'navy',
    },

    {
      name: 'Lex Goudriaan',

      color: 'pink',
    },

    {
      name: 'Kenneth Mensink',

      color: 'turquoise',
    },
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
  selectedName = 'Player';
  selectedNames: any[] = [];
  isCollapsibleOpen = false;
  newName: { name: string; color: string } = {
    name: '',
    color: '',
  };
  editedColor!: any;
  questionList: quizData[] = [];
  catagoryQuestionList: quizData[] = [];
  topic: string = '';
  topics: string[] = [];
  selectedCategory!: string;
  catagory: boolean = false;

  constructor(private service: GameServiceApi) {}

  ngOnInit(): void {
    this.getQuestion();
    this.assignNames();
  }

  getQuestion() {
    this.service.getData().subscribe((data) => {
      this.questionList = data;
      this.topics = [...new Set(this.questionList.map((item) => item.topic))];
    });
  }

  assignNames() {
    this.idToLandOn = Math.floor(Math.random());
    this.items = this.names.map((value, index) => ({
      fillStyle: value.color,
      text: value.name,
      id: index,
      textFillStyle: 'black',
      textFontSize: '22',
    }));
  }

  reset() {
    this.wheel.reset();
  }

  spin() {
    this.randomQuestion = '';
    this.removeName(this.idToLandOn);
    this.reset();
    this.idToLandOn = Math.floor(Math.random());
    this.wheel.spin();
  }

  removeName(idToLandOn: any) {
    const removedName = this.names.splice(idToLandOn, 1)[0];
    this.assignNames();
    this.selectedNames.push(removedName);
    this.selectedName = removedName.name;
  }

  toggleCollapsible() {
    this.isCollapsibleOpen = !this.isCollapsibleOpen;
  }

  getCatagoryQuestion(topicName: string) {
    this.catagoryQuestionList = this.questionList.filter(
      (x) => x.topic == topicName
    );
  }

  getRandomQuestion() {
    const questionList = this.catagory ? this.catagoryQuestionList : this.questionList;
    const randomIndex = Math.floor(Math.random() * questionList.length);
    this.randomQuestion = questionList[randomIndex].question;
  }
  before() {
    this.sound.play();
  }

  after() {
    this.sound.unload();
    this.getRandomQuestion();
  }

  editName(id: any) {
    this.newName = this.names[id];
    this.names.splice(id, 1)[0];
    this.assignNames();
  }

  deleteName(id: any) {
    this.names.splice(id, 1)[0];
    this.setWheel();
  }

  addName(name: any, color: any) {
    this.names.push({ name, color });
    this.setWheel();
  }

  onChangeCategory(event: Event) {
    this.catagory = true;
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.getCatagoryQuestion(selectedValue);
  }

  setWheel() {
    this.reset();
    this.assignNames();
    this.idToLandOn = Math.floor(Math.random());
    setTimeout(() => {
      this.setWheel(), 1000;
    });
  }

  editColor() {
    this.setWheel();
  }
}
