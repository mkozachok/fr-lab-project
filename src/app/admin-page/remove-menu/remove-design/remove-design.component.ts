import { Component, OnInit, OnDestroy } from '@angular/core';
import { DesignService, CommonService } from '../../../services';
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
  deleteType: string = 'single deleting';
  designsForMultiDeleting: Array<any> = [];
  multiDelete: boolean;
  removeDesignSubscription: Subscription = new Subscription();
  designs;
  arrOfDesigns: Observable<Array<any>>;
  showSpinner: boolean = true;
  constructor(
    private _designService: DesignService,
    private _commonService: CommonService
  ) {

  }

  getDesignsArr(): void{
    this.removeDesignSubscription.add(this._designService.getDesigns()
    .subscribe(res => {
      this.showSpinner = false;
      this.designs = res;
      this.arrOfDesigns = this.designs;
    }))
  }

  ngOnInit() {
    this.getDesignsArr();
  }

  ngOnDestroy(){
    this.removeDesignSubscription.unsubscribe();
  }

   filterItem(phrase) {
    this.designs = this.arrOfDesigns;
    this.designs = this._designService.findDesign(phrase, this.designs);
  } 

  changeDeleteType() {
    this.multiDelete = !this.multiDelete;
    this.deleteType = this.multiDelete ? 'multi deleting' : 'single deleting';
    this.designsForMultiDeleting = [];
  }

  checkedProduct({$key, checked, url}) {
     let index;
    if (checked) {
      this.designsForMultiDeleting.push({id: $key, url: url })
    } else {
      index = this.designsForMultiDeleting
        .map(el => el.id)
        .indexOf($key)
      this.designsForMultiDeleting.splice(index, 1);
    } 
  }

   deleteSelected() {
    if(this.designsForMultiDeleting.length){
      this._designService.deleteArrOfDesigns(this.designsForMultiDeleting)
    }else{
      this._commonService.openSnackBar('Please, select designs for delating', 'required');
    }
  } 
}



