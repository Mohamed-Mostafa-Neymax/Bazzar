import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  type = 1;
  categoryForm: FormGroup;
  constructor(private globalService: GlobalService,private spinner:NgxSpinnerService) { }
  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      'name_en': new FormControl(null, Validators.required),
      'name_ar': new FormControl(null, Validators.required)
    });
    
  }
  files: File[] = [];
  imagesObj = {}
  
  onSelect(event) {
    console.log(event.addedFiles[0]);
    this.files = [];
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  onSubmit(){
    let category_Obj = new FormData();
    category_Obj.append('image', this.files[0]);
    category_Obj.append('name_ar', this.categoryForm.value.name_ar);
    category_Obj.append('name_en', this.categoryForm.value.name_en);
    this.globalService.addCategory(category_Obj).subscribe( res => {
      console.log(res);
      this.spinner.hide();
      Swal.fire(
          'نجاح',
          'تم إضافة الفئة بنجاح',
          'success'
      )
    });
  }
}
