import { Injectable } from '@angular/core';
import { Design } from '../models/design-model';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DesignService {
  private _url: string = 'assets/design/designs.json';
  constructor(private _http:Http) {}
    getAll() {
      return this._http.get(this._url)
          .map((response: Response) => response.json());
    }
    getOne(id:number) {
      // return this.getAll()
      //     .map()
    }
}
