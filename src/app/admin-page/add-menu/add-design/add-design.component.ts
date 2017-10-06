import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { CommonService, DesignService } from '../../../services';

@Component({
  selector: 'app-add-design',
  templateUrl: './add-design.component.html',
  styleUrls: ['./add-design.component.scss']
})
export class AddDesignComponent implements OnInit {
  waitForDelivery: boolean;
  designForm: FormGroup
  name: string;
  price: string;
  ReferenceToDesigns: string = 'designs';

  constructor(
    private _formBuilder: FormBuilder,
    public snackBar: MdSnackBar,
    private _commonService: CommonService,
    private _designService: DesignService
  ) {

  }

  ngOnInit(): void {
    this.designForm = this._formBuilder.group({
      name: [null,
        [
          Validators.required
        ]
      ],
      price: [null,
        [
          Validators.required
        ]
      ],
    })
  }

  onSubmit(): void {
    this.waitForDelivery = true;
    this.name = this.designForm.value.name;
    this.price = this.designForm.value.price;
  }


  onNotify(url) {
    this._designService.setDesign({
      name: this.name,
      price: this.price,
      url: url
    }).then(resolve => {
      this._commonService.openSnackBar('The produc has been saved', 'success');
    }).catch(error => {
      this._commonService.openSnackBar(error.name, 'error');
    }).then(() => this.waitForDelivery = false);
  }
}

