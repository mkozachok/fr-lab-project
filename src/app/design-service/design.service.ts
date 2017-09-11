import { Injectable } from '@angular/core';
import { Design } from '../models/design-model';
import { Http, Response,Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DesignService {
  private _url: string = 'assets/design/designs.json';
  constructor(private _http:Http) {}
    getAll() {
      return this._http.get(this._url)
          .map((response: Response) => response.json());
    }
    getOne(id:string) {
      const url = `${this._url}/${id}`;
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let params = new URLSearchParams();
	    params.append('id', id);
      let options = new RequestOptions({headers: headers, params: params});
      return this._http.get(url, options)
        .map((response: Response) => response.json());
    }
    add(design: Design) {
      const url = `${this._url}/${design.id}`
	    let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this._http.post(url, design, options)
                   .map((response: Response) => response.json());
    }
    update(design: Design) {
      const url = `${this._url}/${design.id}`
	    let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this._http.put(url, design, options)
                   .map((response: Response) => response.json());
    }
}
