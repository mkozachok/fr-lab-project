import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { CommonService, DesignService } from '../../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-design',
  templateUrl: './add-design.component.html',
  styleUrls: ['./add-design.component.scss']
})
export class AddDesignComponent implements OnInit {
  ReferenceToDesigns: string = 'designs';
  waitForDelivery: boolean;
  designForm: FormGroup
  name: string;
  price: string;
  category: string;
  categories: Observable<Array<string>>

  constructor(
    private _formBuilder: FormBuilder,
    public snackBar: MdSnackBar,
    private _commonService: CommonService,
    private _designService: DesignService
  ) {

  }

  ngOnInit(): void {
    this._designService.getDesignCategory().subscribe(res => {
      this.categories = res.map(el => el.category).splice(1);
    })
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
      category: [null,
        [
          Validators.required
        ]
      ]
    })
  }

  onSubmit(): void {
    this.waitForDelivery = true;
    this.name = this.designForm.value.name;
    this.price = this.designForm.value.price;
    this.category = this.designForm.value.category;
  }


  onNotify(url) {
    this._designService.setDesign({
      category: this.category,
      name: this.name,
      price: this.price,
      url: url
    }).then(resolve => {
      this._commonService.openSnackBar('The design has been saved', 'success');
    }).catch(error => {
      this._commonService.openSnackBar(error.name, 'error');
    }).then(() => this.waitForDelivery = false);
  }
}

