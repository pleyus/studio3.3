// ng build --base-href=/radio/ --prod --build-optimizer
import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private options = {
    playing: false,
    compact: false,
    stream: 'http://72.249.55.100:9648/stream/4/'
  };
  public CProgram = {
    img: false,
    name: 'Música para ti',
    days: [],
    hosts: []
  };
  public Guide = [];
  public LISTID = '';

  private Player;
  private PlayerTimer = null;

  public alert = {
    type: -1,
    message: '',
    showing: false
  };
  time = { s: 0, m: 0, text: '00:00' };

  private alert_timer = null;

  public Play() {
    if (this.PlayerTimer != null) {
      clearInterval(this.PlayerTimer);
    }

    this.Player = new Audio(this.options.stream);
    this.Player.load();
    this.Player.play();

    this.PlayerTimer = setInterval(() => {
      this.SetTime();
    }, 1000);
    this.SetOption('playing', true);
  }
  public Pause() {
    if (this.PlayerTimer != null) {
      clearInterval(this.PlayerTimer);
    }

    this.Player.pause();
    this.Player = null;

    this.time = { s: 0, m: 0, text: '00:00' };
    this.SetOption('playing', false);
  }

  public SetTime() {
    //  Si no se esta reproduciendo, detener contador, hasta que se reprodusca
    //  if(this.Player is playing ese)
    this.time.s++;
    if (this.time.s > 59) {
      this.time.s = 0;
      this.time.m++;
    }

    this.time.text =
      (this.time.m > 9 ? '' + this.time.m : '0' + this.time.m) +
      ':' +
      (this.time.s > 9 ? '' + this.time.s : '0' + this.time.s);
  }
  public GetOption(option, def = false) {
    let val = this.options[option];
    if (val === undefined) { val = def; }
    return val;
  }
  public SetOption(option, value) {
    this.options[option] = value;
    localStorage.setItem(option, value);
  }

  public GetGuide() {
    this.ShowAlert('Obteniendo programación', -1, 0);
    this.S.Web('radio', 'list-guide', 'down=1', r => {
      this.ClearAlert();

      if (r.status === 1)  {
        this.Guide = r.data;
      } else {
        this.ShowAlert(r.data, r.status);
      }

      this.UpdateProgram();
    });
  }
  public UpdateProgram() {
    const Today = new Date(),
      h = Today.getHours() * 60 + Today.getMinutes();
    let found = false;

    this.Guide.forEach(G => {
      if (found) { return; }

      G.days.forEach(D => {
        if (found) { return; }
        const hi = D.start.h * 60 + D.start.m,
          hf = D.end.h * 60 + D.end.m;
        if (Today.getDay() === D.day && h >= hi && h <= hf) {
          this.CProgram = G;
          found = true;
        }
      });
    });
    if (!found) {
      this.CProgram = {
        img: false,
        name: 'Música para ti',
        days: [],
        hosts: []
      };
    }
    setTimeout(() => {
      this.UpdateProgram();
    }, 10000);
  }

  /**
   * Muestra una alerta superpuesta
   * @param message Es el mensaje que se desea mostrar
   * @param type Tipo de la alerta
   * @param time Tiempo de espera para quitar la alerta
   */
  public ShowAlert(message, type = -1, time = 5000) {
    this.alert.type = type;
    this.alert.message = message;
    this.alert.showing = true;

    if (this.alert_timer !== null) {
      clearInterval(this.alert_timer);
    }

    if (time > 0) {
      this.alert_timer = setInterval(() => {
        this.ClearAlert();
      }, time);
    }
  }
  public ClearAlert() {
    this.alert.showing = false;
  }

  public isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
  RandString(len) {
    const CharList = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z'
    ];
    let rs = '';

    for (let i = 0; i < len; i++) {
      rs += CharList[this.Random(0, CharList.length)];
    }
    return rs;
  }
  public Random(min: number, max: number) {
    return Math.floor(Math.random() * max) + min;
  }

  constructor(private S: AppService) {
    //  Generamos un Id unico para este oyente
    this.LISTID =
      localStorage.getItem('LISTID') !== ''
        ? '' + localStorage.getItem('LISTID')
        : '';
    if (this.LISTID.length < 32) {
      this.LISTID = this.RandString(32);
    }
    localStorage.setItem('LISTID', this.LISTID);

    //  Cargamos la configuración
    this.options.compact = localStorage.getItem('compact') === 'true';
    this.options.playing =
      localStorage.getItem('playing') === 'true' && !this.isMobile();
    localStorage.setItem('playing', this.options.playing ? 'true' : 'false');

    if (this.options.playing) {
      this.ShowAlert('Iniciando radio...', -1, 0);
      setTimeout(() => {
        this.ClearAlert();
        this.Play();
        this.GetGuide();
      }, 3000);
    } else {
      this.GetGuide();
    }
  }
}
