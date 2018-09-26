import { Component, OnInit } from '@angular/core';
import { AppComponent } from  '../app.component';

@Component({
  selector: 'app-compact',
  templateUrl: './compact.component.html',
  styleUrls: ['./compact.component.css']
})
export class CompactComponent implements OnInit {

	constructor(public $ : AppComponent ) { }


	ngOnInit() {
	}
	
	PlayPause()
	{
		if(this.GetOption('playing'))
			this.$.Pause();
		else
			this.$.Play(); 
	}

	SetOption(option, value)
	{
		this.$.SetOption(option, value);
	}
	GetOption(option, def = false)
	{
		return this.$.GetOption(option, def);
	}
}
