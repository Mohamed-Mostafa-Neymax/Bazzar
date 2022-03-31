import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-voucher',
  templateUrl: './add-voucher.component.html',
  styleUrls: ['./add-voucher.component.scss']
})
export class AddVoucherComponent implements OnInit {

  addVoucherForm: FormGroup;

  constructor( private globalService: GlobalService, private dialog:MatDialog, private spinner:NgxSpinnerService ) { }
  ngOnInit(): void {
    this.addVoucherForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'discount_percentage': new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    this.spinner.show();
    this.globalService.addVouchers(this.addVoucherForm.value).subscribe( addVoucherRes => {
      console.log('addVoucherRes', addVoucherRes);
      this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم إضافة الكوبون بنجاح',
        'success'
      );
      this.dialog.closeAll();
    });
  }
}
