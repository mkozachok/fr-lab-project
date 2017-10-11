import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { DesignService, CommonService } from '../../../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-design',
  templateUrl: './edit-design.component.html',
  styleUrls: ['./edit-design.component.scss']
})
export class EditDesignComponent implements OnInit {
  waitForDelivery: boolean;
  designForm: FormGroup;
  category: string;
  categories: Observable<Array<string>>

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
    this._designService.getDesignCategory().subscribe(res => {
      this.categories = res.map(el => el.category).splice(1);
    })

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
      ],
      category: [this.data.category,
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
      category: product.category,
      name: product.name,
      price: parseFloat(product.price),
    }).then(() => {
      this._commonService.openSnackBar('The design has been updated', 'success');
      this.dialogRef.close();
    }).catch(error => {
      this._commonService.openSnackBar(error.name, 'error');
    });

  }

}
