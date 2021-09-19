import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../global.service';
import { ServerService } from '../server.service';
import {Store, select } from '@ngrx/store';
import * as UserdataActions from '../userdata.actions';
import * as fromUserData from '../userdata.selectors';

declare var require: any
var Highcharts = require('highcharts');
// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);
// Create the chart


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
  backspaceKeyCode = 8;
  selectedCountry = '';
  selectedCategory = '';

  sentence: any = [];
  chartData: any;
  newsData: any = [];
  mentionedWordsList: object[] = [];

  constructor(public global: GlobalService, private server: ServerService, private store:Store) {
    this.selectedCountry = 'us';
    this.selectedCategory = 'business';
  }

  ngOnInit(): void {
    this.getChartData();
    this.searchNews();
  }

  getChartData() {
    this.server.getChartData().subscribe((response) => {
      this.chartData = response;
      this.generateHighCharts();
    }, (error) => {
      this.chartData = [];
    });
  }

  addToVisibleDiv(event) {

    if (event.keyCode == this.backspaceKeyCode) {
      // console.log(this.sentence);
      // console.log(this.normalText);

      let temp = this.normalText.split(' ');

      this.mentionedWordsList = this.sentence.filter((word, index) => {
        if (word.isMention) {
          let mentionedObj = {
            wordObj: word,
            indexOfWordInSentence: index
          }
          temp.splice(index, 0, word);
          return mentionedObj;
        }
      })

      this.sentence = [];
      for (let i = 0; i < temp.length; i++) {

        if (typeof temp[i] !== 'object') {
          let wordObj = {
            value: temp[i],
            isMention: false
          }
          if (wordObj.value != "" && !wordObj.isMention) {
            this.sentence.push(wordObj)
          }
        } else {
          this.sentence.push(temp[i]);
        }
      }
      return;
    }

    if (event.keyCode == this.shiftKeyCode) {
      return;
    }
    if (event.keyCode != this.atKeyCode && event.keyCode != this.spaceKeyCode && event.keyCode != this.backspaceKeyCode) {
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
    } else if (event.keyCode == this.spaceKeyCode && event.keyCode != this.backspaceKeyCode) {
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

  generateHighCharts() {
    Highcharts.chart('container', {
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'USD to EUR exchange rate over time'
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: 'Exchange rate'
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
          },
          marker: {
            radius: 2
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      },

      series: [{
        type: 'area',
        name: 'USD to EUR',
        data: this.chartData
      }]
    });
  }

  searchNews() {
    let query = "&country=" + this.selectedCountry + "&topic=" + this.selectedCategory;

    this.store.dispatch(new UserdataActions.newsData(query));

    this.store.pipe(select(fromUserData.getNewsData)).subscribe(
      news => {
        this.newsData = news['articles'];
      }
    )
    
  }

}
