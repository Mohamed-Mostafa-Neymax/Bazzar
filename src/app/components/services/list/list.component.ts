import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  usersArr = [];
  userType = 1;
  userStatus = 0;

  constructor(private dialog:MatDialog, private globalService: GlobalService, private spinner:NgxSpinnerService) { }
  ngOnInit(): void {
    this.onShowUsers();
  }
  
  // Filter
  onChangeUserType(userType: number) {
    this.userType = userType;
    this.onShowUsers();
  }
  onChangeUserStatus(userStatus: number) {
    this.userStatus = userStatus;
    this.onShowUsers();
  }

  // List
  onShowUsers() {
    this.spinner.show();
    this.globalService.listUsers(this.userType, this.userStatus).subscribe( usersRes => {
      this.spinner.hide();
      console.log('Users Array (Response)', usersRes);
      this.usersArr = usersRes['data'];
    });
  }

  // Accept || Reject
  onChangeStatus(userId, newStatus) {
    this.globalService.setUserStatus({user_id: userId, status_id: newStatus}).subscribe( updateUserRes => {
      console.log('Update User (Response)', updateUserRes);
      this.onShowUsers();
      Swal.fire(
        'نجاح',
        'تم تعديل حالة المستخدم بنجاح',
        'success'
      );
    });
  }
}
