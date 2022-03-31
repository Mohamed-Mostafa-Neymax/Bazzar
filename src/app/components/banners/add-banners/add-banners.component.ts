import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-banners',
  templateUrl: './add-banners.component.html',
  styleUrls: ['./add-banners.component.scss']
})
export class AddBannersComponent implements OnInit {
  files: File[] = [];

  constructor(private globalService: GlobalService,private spinner:NgxSpinnerService) { }
  ngOnInit(): void {}
  
  onSelect(event)  {
    this.files = [];
    this.files.push(...event.addedFiles);
  }
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  onSubmit(){
    let image = new FormData();
    image.append('image', this.files[0]);
    this.spinner.show();
    this.globalService.addBanner(image).subscribe( res => {
      console.log(res);
      this.spinner.hide();
      Swal.fire(
          'نجاح',
          'تم إضافة اللوحة بنجاح',
          'success'
      )
    });
  }
}
