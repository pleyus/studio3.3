import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent implements OnInit {

  TODAY = new Date().getDay();
  DAY_SELECTED = -1;
  Days = [
    { name: 'Lunes', day: 1 },
    { name: 'Martes', day: 2 },
    { name: 'Miércoles', day: 3 },
    { name: 'Jueves', day: 4 },
    { name: 'Viernes', day: 5 },
    { name: 'Sábado', day: 6 },
  ];

  constructor(public $: AppComponent ) { }

  ngOnInit() {
    this.DAY_SELECTED = this.TODAY;
  }

  sTime(time) {
    return (time.h > 9 ? '' + time.h : '0' + time.h) +
        ':' +
        (time.m > 9 ? '' + time.m : '0' + time.m);
  }
  Updater() {
  }

}
