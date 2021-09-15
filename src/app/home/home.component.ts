import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../global.service';
import { ServerService } from '../server.service';

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
  selectedCountry = '';
  selectedCategory = '';

  sentence: any = [];
  chartData: any;
  newsData: any = [];

  constructor(public global: GlobalService, private server: ServerService) {
    this.selectedCountry = 'us';
    this.selectedCategory = 'business';
  }

  ngOnInit(): void {
    this.getChartData();
    // Highcharts.chart('container', { /*Highcharts options*/ });
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
    let query = "?country=" + this.selectedCountry + "&category=" + this.selectedCategory;

    this.server.getNewsData(query).subscribe((response) => {
      this.newsData = response['articles'];
    }, (error) => {
      this.newsData = [];
    });
  }

}
