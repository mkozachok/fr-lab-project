import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { UserService } from '../../services';

@Component({
  selector: 'app-log-out-message',
  templateUrl: './log-out-message.component.html',
  styleUrls: ['./log-out-message.component.scss']
})
export class LogOutMessageComponent implements OnInit {

  constructor(
    private userService: UserService,
    public dialogRef: MdDialogRef<LogOutMessageComponent>,
    @Inject(MD_DIALOG_DATA) private data: any
  ) { }

  ngOnInit() {
  }

  onLogOut(){
    this.userService.logOut();
    this.dialogRef.close();
  }
}
