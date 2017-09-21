import { Component, OnInit, OnDestroy } from '@angular/core';
import { DesignService } from '../../../services/design.service';
import { Observable, Subscription } from 'rxjs';
import { Design } from '../../../models/design-model';


@Component({
  selector: 'app-remove-design',
  templateUrl: './remove-design.component.html',
  styleUrls: ['./remove-design.component.scss']
})
export class RemoveDesignComponent implements OnInit, OnDestroy {

  subscriptionToDesignList: Subscription;
  designs;
  filteredArr: Observable<Array<any>>;
  showSpinner: boolean = true;
  constructor(
    private _designService: DesignService
  ) {

  }

  getAdminsArr(): void{
    this.subscriptionToDesignList = this._designService.getDesigns()
    .subscribe(res => {
      this.showSpinner = false;
      this.designs = res;
    })
  }

  ngOnInit() {
    this.getAdminsArr();
  }

  ngOnDestroy(){
    this.subscriptionToDesignList.unsubscribe();
  }

   filterItem(phrase) {
    this.getAdminsArr();
    this.designs = this._designService.findDesign(phrase, this.designs);
  } 

}



