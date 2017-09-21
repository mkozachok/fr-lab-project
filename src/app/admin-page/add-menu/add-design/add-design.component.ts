import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { DesignService } from '../../../services/design.service';

@Component({
  selector: 'app-add-design',
  templateUrl: './add-design.component.html',
  styleUrls: ['./add-design.component.scss']
})
export class AddDesignComponent implements OnInit {
  designForm: FormGroup
  name: string;

  constructor(
    private _formBuilder: FormBuilder,
    public snackBar: MdSnackBar,
    private _designService: DesignService
  ) {

   }

  ngOnInit(): void {
    this.designForm = this._formBuilder.group({
      name: []
    })
  }

  onSubmit(): void {
    this.name = this.designForm.value.name;

  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onNotify(url) {
    this._designService.setDesign({
      name: this.name,
      photoUrl: url
    }).then(resolve => {
      this.openSnackBar('The produc has been saved', 'success');
    }).catch(error => {
      this.openSnackBar(error.name, 'error');
    });
  }
}

