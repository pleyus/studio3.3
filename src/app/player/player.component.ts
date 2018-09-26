import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AppService } from '../app.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {

	constructor(public $: AppComponent, private S : AppService ) { }

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
