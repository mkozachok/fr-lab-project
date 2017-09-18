import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  adminForm: FormGroup
  
    constructor(
      private _formBuilder: FormBuilder,
      public snackBar: MdSnackBar,
      private _adminService: AdminService
    ) { }
  
    ngOnInit(): void {
      this.adminForm = this._formBuilder.group({
        name: [],
        id: []
      })
    }
  
    onSubmit(): void {
      
      this._adminService.setNewAdmin(this.adminForm.value).then(resolve => {
        this.openSnackBar('The produc has been saved', 'success');
      }).catch(error => {
        this.openSnackBar(error.name, 'error');
      });
    }
  
    openSnackBar(message: string, action: string): void {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }

}
