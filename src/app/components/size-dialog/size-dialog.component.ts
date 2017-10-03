import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MdDialogConfig } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-size-dialog',
  templateUrl: './size-dialog.component.html',
  styleUrls: ['./size-dialog.component.css']
})
export class SizeDialogComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<SizeDialogComponent>, @Inject(MD_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    this.thisDialogRef.updatePosition({ top: '17%' });
  }

}
