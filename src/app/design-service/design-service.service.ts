import { Injectable } from '@angular/core';
import { Design } from '../models/design-model';
import { DESIGNS } from './designs';

@Injectable()
export class DesignServiceService {
  getAll(): Promise<Design[]> {
    return Promise.resolve(DESIGNS);
  }
  

}
