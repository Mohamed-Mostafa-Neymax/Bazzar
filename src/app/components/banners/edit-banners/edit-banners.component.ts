import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-banners',
  templateUrl: './edit-banners.component.html',
  styleUrls: ['./edit-banners.component.scss']
})
export class EditBannersComponent implements OnInit {
  files: File[] = []
  image_edit = false;
  constructor(private dialog:MatDialog, private globalService:GlobalService, @Inject(MAT_DIALOG_DATA) public data:any, private spinner:NgxSpinnerService) { }
  ngOnInit(): void {
    console.log(this.data);
  }
  changeImage(){
    this.image_edit=!this.image_edit;
  }
  onSelect(event) {
    this.files = [];
    this.files.push(...event.addedFiles);
  }
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  onSubmit() {
    let banner_Obj = new FormData();
    banner_Obj.append('image', this.files[0]);
    banner_Obj.append('banner_id', this.data.id);
    this.spinner.show();
    this.globalService.editBanner(banner_Obj).subscribe( res=> {
      console.log(res);
      this.spinner.hide();
      Swal.fire(
          'نجاح',
          'تم تعديل اللوحة بنجاح',
          'success'
      );
      this.dialog.closeAll();
    });
  }
}
