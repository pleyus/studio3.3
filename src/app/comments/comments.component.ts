import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
	Response = '';
	Name = '';
	Message = '';
	Code = '';

	constructor( private S : AppService, private $ : AppComponent ) { }
	ngOnInit() {
		this.CaptchaReload();
		this.Name = localStorage.getItem('name');
		this.Message = localStorage.getItem('message');
	}

	SendMessage(){
		if(this.Name.trim() == '')
		{
			this.$.ShowAlert('Escribe tu nombre o al menos un apodo para identificarte', 2);
			return;
		}
		if(this.Message.trim() == '')
		{
			this.$.ShowAlert('¿Y que nos quieres decir? Escribe tu mensaje', 2);
			return;
		}
		if(this.Response.trim() == '')
		{
			this.$.ShowAlert('Escribe el codigo del captcha, lo sabemos, es molesto pero asi evitamos el spam', 2);
			return;
		}

		//	Almacenamos el nombre y el mensaje
		localStorage.setItem('name', this.Name);
		localStorage.setItem('message', this.Message);

		this.S.Web('radio', 'send-message', 
			'response='+this.Response +
			'&name='+this.Name +
			'&message='+this.Message +
			'&token=' + this.$.LISTID, 
		(r) => {
			if(r.status == 1)
			{
				localStorage.setItem('message', '');
				this.Message = '';
				this.Response = '';
			}
			this.Code = r.data.code;
			this.$.ShowAlert(r.data.message, r.status);
		});
	}
	CaptchaReload()
	{
		this.S.Web('captcha', 'run', 'reload=true', (r) => {
			if(r.status == 1)
				this.Code = r.data.code;
			else 
				this.Code = '';
		});
	}

}
