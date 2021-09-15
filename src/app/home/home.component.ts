import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('visibleDiv') visibleDiv: ElementRef;
  @ViewChild('normalTextSelector') normalTextSelector: ElementRef;
  @ViewChild('mentionTextSelector') mentionTextSelector: ElementRef;

  inputText: string = "";
  mentionText: string = "";
  normalText: string = "";
  actualTextDiv: any;
  atKeyCode = 50;
  spaceKeyCode = 32;
  shiftKeyCode = 16;

  sentence: any = [];

  constructor(public global: GlobalService) { }

  ngOnInit(): void {
  }

  addToVisibleDiv(event) {
    if (event.keyCode == this.shiftKeyCode) {
      return;
    }
    if (event.keyCode != this.atKeyCode && event.keyCode != this.spaceKeyCode) {
      let temp = this.normalText.split(' ');
      let lengthOfSentence = temp.length;
      let ind = this.sentence.length;
      let wordObj = {
        value: temp[lengthOfSentence - 1],
        isMention: false
      }
      if (ind == 0) {
        this.sentence[ind] = wordObj;
      } else {
        if (!this.sentence[ind - 1].isMention) {
          this.sentence[ind - 1] = wordObj;
        } else {
          this.sentence[ind + 1] = wordObj;
        }
      }
    } else if (event.keyCode == this.spaceKeyCode) {
      let temp = this.normalText.split(' ');
      let lengthOfSentence = temp.length;
      if (temp[lengthOfSentence - 1] != undefined) {
        let wordObj = {
          value: temp[lengthOfSentence - 1],
          isMention: false
        }
        this.sentence.push(wordObj);
      }
    } else {
      this.mentionTextSelector.nativeElement.focus()
    }
  }

  mentionSelected() {
    this.normalText = this.normalText.replace('@', '');
    this.sentence = this.sentence.filter(i => {
      if (i.value != '') {
        return i
      }
    });
    let wordObj = {
      value: this.mentionText,
      isMention: true
    }
    this.sentence.push(wordObj);
    this.normalTextSelector.nativeElement.focus();
    this.mentionText = "";
  }

  focusOnInput() {
    this.normalTextSelector.nativeElement.focus();
  }

}
