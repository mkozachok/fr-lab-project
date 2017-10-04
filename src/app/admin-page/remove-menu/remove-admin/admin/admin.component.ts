import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from '../../../../services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
@Input() name: string;
@Input() $key: string;

  constructor(
    private _adminService: AdminService
  ) { }

  ngOnInit() {
  }

  deleteAdmin(){
    this._adminService.deleteAdmin(this.$key);
  }

}
