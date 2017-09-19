import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Observable, Subscription } from 'rxjs';
import { Admin } from '../../../models/admin-model';

@Component({
  selector: 'app-remove-admin',
  templateUrl: './remove-admin.component.html',
  styleUrls: ['./remove-admin.component.scss']
})


export class RemoveAdminComponent implements OnInit {
  subscriptionToAdminsList: Subscription;
  admins: Observable<Array<any>>;
  filteredArr: Observable<Array<any>>;
  showSpinner: boolean = true;
  constructor(
    private _adminService: AdminService
  ) {

  }

  ngOnInit() {
    this.subscriptionToAdminsList = this._adminService.getAdminsList()
      .subscribe(res => {
        this.showSpinner = false;
        this.admins = res;
      }
      )
  }

  deleteAdmin(e: MouseEvent) {
    let id: string;
    if (e.srcElement.textContent === 'delete') {
      id = e.srcElement.parentNode.childNodes.item(3).textContent;
      this._adminService.deleteAdmin(id);
    }
  }

  filterItem(phrase) {
    this.ngOnInit();
    this.admins = this._adminService.findAdmin(phrase, this.admins);

  }
}
