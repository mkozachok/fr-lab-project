import { Component, OnInit, OnDestroy } from '@angular/core';
import { DesignService } from '../../../services';
import { Observable, Subscription } from 'rxjs';
import { Design } from '../../../models/design-model';


@Component({
  selector: 'app-remove-design',
  templateUrl: './remove-design.component.html',
  styleUrls: ['./remove-design.component.scss']
})
export class RemoveDesignComponent implements OnInit, OnDestroy {
  iconEmpty:string = 'collections';
  messageEmpty:string = 'There are no designs';
  iconNotFound:string = 'search';
  messageNotFound:string = 'There are no designs you are loking for';
  removeDesignSubscription: Subscription = new Subscription();
  designs;
  arrOfDesigns: Observable<Array<any>>;
  showSpinner: boolean = true;
  constructor(
    private _designService: DesignService
  ) {

  }

  getAdminsArr(): void{
    this.removeDesignSubscription.add(this._designService.getDesigns()
    .subscribe(res => {
      this.showSpinner = false;
      this.designs = res;
      this.arrOfDesigns = this.designs;
    }))
  }

  ngOnInit() {
    this.getAdminsArr();
  }

  ngOnDestroy(){
    this.removeDesignSubscription.unsubscribe();
  }

   filterItem(phrase) {
    this.designs = this.arrOfDesigns;
    this.designs = this._designService.findDesign(phrase, this.designs);
  } 

}



