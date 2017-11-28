import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatRadioChange, MatTableDataSource} from '@angular/material';
import {isNullOrUndefined} from 'util';
import {ActivatedRoute, Router} from '@angular/router';
import {Http, RequestOptions, Headers} from '@angular/http';

@Component({
  selector: 'app-stimulus',
  templateUrl: './stimulus.component.html',
  styleUrls: ['./stimulus.component.css']
})
export class StimulusComponent implements OnInit {

  @ViewChild('rb') el:ElementRef;

  displayedLabelColumns = ['全く感じない', '1', '2', '3', '4', '5', '6', '7', '8', '9', '非常に感じる'];
  displayedColumns = ['emotion', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  dataSource = new MatTableDataSource<Emotion>(ELEMENT_D);

  sources = ["angry_mask.jpg", "eye_happy50.jpg", "happy30.jpg", "partsChange_ea_mh.jpg", "sad_mask.jpg",
    "disgust50.jpg", "eye_surprise50.jpg", "mouth_disgust50.jpg", "partsChange_eh_ma.jpg",
    "disgust_mask.jpg", "fear70.jpg",	"mouth_happy50.jpg","partsChange_esa_msu.jpg"
  ];
  // sources = ["angry_mask.jpg", "eye_happy50.jpg"
  // ];

  currentImageSrc: string;
  okEnabled = true;

  checked: boolean;
  isNotCleanAndNotFinished = false;
  imageViewd = true;
  reload: boolean;

  angerVal: number;
  disgustVal: number;
  fearVal: number;
  happinessVal: number;
  sadnessVal: number;
  surpriseVal: number;

  images = [];

  count: number = 0;


  constructor(private http: Http) {
  }

  ngOnInit() {
    this.currentImageSrc = "assets/" + this.sources[this.count];
    for(let src of this.sources) {
      this.images.push("assets/" + src);
    }
  }

  onChanged(ev: MatRadioChange) {
    switch(ev.source.name) {
      case 'anger':
        console.log(this.angerVal);
        this.angerVal = ev.value;
        console.log(this.angerVal);
        break;
      case 'disgust':
        this.disgustVal = ev.value;
        break;
      case 'fear':
        this.fearVal = ev.value;
        break;
      case 'happiness':
        this.happinessVal = ev.value;
        break;
      case 'sadness':
        this.sadnessVal = ev.value;
        break;
      case 'surprise':
        this.surpriseVal = ev.value;
        break;
      default:
        console.log("unknown changed");
        break;
    }
  }

  onOKClicked() {

    if (isNullOrUndefined(this.angerVal) ||
      isNullOrUndefined(this.disgustVal) ||
      isNullOrUndefined(this.fearVal) ||
      isNullOrUndefined(this.happinessVal) ||
      isNullOrUndefined(this.sadnessVal) ||
      isNullOrUndefined(this.surpriseVal)) {
      console.log("未入力があります");
      this.isNotCleanAndNotFinished = true;
      return;
    }
    let url = "https://1rbqyvgulf.execute-api.ap-northeast-1.amazonaws.com/dev/review"
    let data = {
      "stimuli_name": this.sources[this.count],
      "anger": this.angerVal,
      "disgust": this.disgustVal,
      "fear": this.fearVal,
      "happiness": this.happinessVal,
      "sadness": this.sadnessVal,
      "surprise": this.surpriseVal
    };

    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions();
    options.headers = headers;

    this.http.post(url, JSON.stringify(data), options)
      .toPromise()
      .then(res => {
        console.log(res.json());
        console.log("ok");
        this.count += 1;

        if (this.count >= this.sources.length) {
          this.okEnabled = false;
          this.imageViewd = false;
        }else {
          this.currentImageSrc = "assets/" + this.sources[this.count];
        }

        this.angerVal = null;
        this.disgustVal = null;
        this.fearVal = null;
        this.happinessVal = null;
        this.sadnessVal = null;
        this.surpriseVal = null;

        this.isNotCleanAndNotFinished = false;
      })

  }

  onReset() {
    this.count = 0;
    this.checked = false;
    this.okEnabled = true;
    this.imageViewd = true;
    this.currentImageSrc = "assets/" + this.sources[this.count];
  }
}

export interface Emotion {
  dname: string;
  name: string;
  checked: boolean;
}

export interface Element {
  name: string;
  emotion: string;
  weight: number;
  symbol: string;
}

const ELEMENT_D: Emotion[] = [
  {dname: '怒り',   name: 'anger', checked: false},
  {dname: '嫌悪',   name: 'disgust', checked: false},
  {dname: '恐れ',   name: 'fear', checked: false},
  {dname: '幸福感', name: 'happiness', checked: false},
  {dname: '悲しみ', name: 'sadness', checked: false},
  {dname: '驚き',   name: 'surprise', checked: false}
];

const ELEMENT_DATA: Element[] = [
  {emotion: '怒り', name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {emotion: '嫌悪', name: 'Helium', weight: 4.0026, symbol: 'He'},
  {emotion: '恐れ', name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {emotion: '幸福感', name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {emotion: '悲しみ', name: 'Boron', weight: 10.811, symbol: 'B'},
  {emotion: '驚き', name: 'Carbon', weight: 12.0107, symbol: 'C'},
];
