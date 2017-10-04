import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { DesignService } from '../../../../services';
import { CommonService } from '../../../../services';

@Component({
  selector: 'app-edit-design',
  templateUrl: './edit-design.component.html',
  styleUrls: ['./edit-design.component.scss']
})
export class EditDesignComponent implements OnInit {
  waitForDelivery: boolean;
  designForm: FormGroup;

  ReferenceToProducts: string = 'products';
  constructor(
    private _formBuilder: FormBuilder,
    public snackBar: MdSnackBar,
    private _designService: DesignService,
    private _commonService: CommonService,
    public dialogRef: MdDialogRef<EditDesignComponent>,
    @Inject(MD_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.designForm = this._formBuilder.group({
      name: [this.data.name,
      [
        Validators.required
      ]
      ],
      price: [this.data.price,
      [
        Validators.required
      ]
      ]
    });
  }

  onSubmit(): void {
    let product = this.designForm.value;
    this.waitForDelivery = true;
    this.dialogRef.disableClose;
    this._designService.updateDesign(this.data.$key, {
      name: product.name,
      price: product.price,
    }).then(() => {
      this._commonService.openSnackBar('The product has been updated', 'success');
      this.dialogRef.close();
    }).catch(error => {
      this._commonService.openSnackBar(error.name, 'error');
    });

  }

}
