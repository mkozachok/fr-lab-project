import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { AdminService } from '../../../services/admin.service';
import { Observable } from 'rxjs';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  adminForm: FormGroup;
  adminList: Observable<Array<any>>;
  waitForDelivery: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    public snackBar: MdSnackBar,
    private _adminService: AdminService,
    private _commonSrvice: CommonService
  ) { }

  ngOnInit(): void {
    this.adminForm = this._formBuilder.group({
      name: [null, 
      [
        Validators.required
      ]
    ],
      id: [null, 
        [
          Validators.required
        ]
      ]
    })
  }

  onSubmit(): void {
    this.waitForDelivery = true;
    this._adminService.setNewAdmin(this.adminForm.value).then(resolve => {
      this._commonSrvice.openSnackBar('The admin has been added', 'success');
    }).catch(error => {
      this._commonSrvice.openSnackBar(error.message, 'error');
    }).then(()=>this.waitForDelivery = false);
  }
}
