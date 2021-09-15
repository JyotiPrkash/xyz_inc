import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':leave', [
          stagger(100, [
            animate('1s', style({ opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('1s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class AboutComponent implements OnInit {

  teamList: object[] = [];
  constructor(private global: GlobalService) { }

  ngOnInit(): void {
  }

  showItems() {
    this.global.teamList.map((i) => {
      this.teamList.push(i);
    })
  }

  hideItems() {
    this.teamList = [];
  }

  toggle() {
    this.teamList.length ? this.hideItems() : this.showItems();
  }

}
