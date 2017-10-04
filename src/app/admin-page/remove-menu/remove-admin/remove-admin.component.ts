import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../../../services';
import { Observable, Subscription } from 'rxjs';
import { Admin } from '../../../models/admin-model';

@Component({
  selector: 'app-remove-admin',
  templateUrl: './remove-admin.component.html',
  styleUrls: ['./remove-admin.component.scss']
})


export class RemoveAdminComponent implements OnInit, OnDestroy {
  subscriptionToAdminsList: Subscription;
  admins: Observable<Array<any>>;
  arrOfAdmins: Observable<Array<any>>;
  filteredArr: Observable<Array<any>>;
  showSpinner: boolean = true;
  constructor(
    private _adminService: AdminService
  ) {

  }

  getAdminsArr(): void{
    this.subscriptionToAdminsList = this._adminService.getAdminsList()
    .subscribe(res => {
      this.showSpinner = false;
      this.admins = res;
      this.arrOfAdmins = this.admins;
    })
  }

  ngOnInit() {
    this.getAdminsArr();
  }

  ngOnDestroy(){
    this.subscriptionToAdminsList.unsubscribe();
  }

  filterItem(phrase) {
    this.admins = this.arrOfAdmins;
    this.admins = this._adminService.findAdmin(phrase, this.admins);
  }
}
