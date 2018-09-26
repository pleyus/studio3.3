import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

	constructor(
		public $ : AppComponent
	) { } 

	ngOnInit() {
	}
	
	GetClass(){ 
		let t = this.$.alert.type,
			c = '';

		if(t == 0)
			c = 'error';
		else if (t == 1)
			c = 'success';
		else if (t == 2)
			c = 'warning';
		
		return c;

	}
	
}
