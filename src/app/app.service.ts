import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor( private http: HttpClient ) { }
  private Url = 'https://unitam.edu.mx/inside/service/?';

  /**
   * Se encarga de descargar datos desde internet (Api rest)
   * @param using Define el modulo de la api que se usará para la obtencion de datos
   * @param make Es la acción a realizar dentro del modulo de la api
   * @param params Parametros que pudiera necesitar el modulo para realizar la acción
   * @param callback Funcion que se llama al terminar la petición
   * @param onerr Funcion que se llama en caso de error en la petición
   */
  Web( using, make, params,
    callback: (r) => void,
    onerr: (r) => void = (r) => {}
  ) {
      const Api = this.Url + 'using=' + using + '&make=' + make,

      headers = new HttpHeaders( {
        'Content-Type' : 'application/x-www-form-urlencoded'
      } ),

      options = {
        headers: headers,
        method: 'post',
        withCredentials: true
      };

    this.http.post(Api, params, options)
      .subscribe(callback, onerr);
  }
}
