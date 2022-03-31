import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  type=1;
    
  files: File[] = []
  imagesObj = {}

  constructor(private dialog:MatDialog, private globalService:GlobalService, @Inject(MAT_DIALOG_DATA) public data:any, private spinner:NgxSpinnerService) { }
  ngOnInit(): void {
    console.log(this.data);
    this.categoryForm = new FormGroup({
      'name_ar': new FormControl(this.data.name_ar, Validators.required),
      'name_en': new FormControl(this.data.name_en, Validators.required)
    });
    console.log(this.files);
  }
  
  // onTypeChange(val) {
  //   this.type= val ; 
  // }
  changeImage(){
    this.image_edit=!this.image_edit ;
  }

  // files: any[] = [0];
  image_edit = false;
  // imagesObj = {}

  onSelect(event) {
    this.files = [];
    this.files.push(...event.addedFiles);
    console.log(this.files);
    
    //  this.globalService.uploadImage(formData).subscribe( imgStringRes => {
    //    this.imagesObj['image'] = imgStringRes['files'][0];
    //console.log(this.imagesObj)
    //   });
  }
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  onSubmit() {
    //console.log({...this.categoryForm.value ,image:this.files[0].name ,category_id:this.data.id});
    let category_Obj = new FormData();
    if( this.files.length > 0 ) category_Obj.append('image', this.files[0]);
    category_Obj.append('category_id', this.data.id);
    category_Obj.append('name_ar', this.categoryForm.value.name_ar);
    category_Obj.append('name_en', this.categoryForm.value.name_en);
    this.spinner.show();
    this.globalService.editCategory(category_Obj).subscribe( res => {
      console.log(res);
      this.spinner.hide();
      Swal.fire(
          'نجاح',
          'تم تعديل الفئة بنجاح',
          'success'
      )
      this.dialog.closeAll();
    });
  }
}
