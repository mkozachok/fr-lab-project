import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MdDialogConfig } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(public thisDialogRef: MdDialogRef<DialogComponent>, @Inject(MD_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  	this.thisDialogRef.updatePosition({ top: '17%' });
  }

  onCloseConfirm() {
  	this.thisDialogRef.close('close');
  }

}
