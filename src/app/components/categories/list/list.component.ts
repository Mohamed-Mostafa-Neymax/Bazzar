import   Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { EditCategoryComponent } from './../edit-category/edit-category.component';
import { CategoryDetailsComponent } from '../category-details/category-details.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  filterForm:FormGroup ;
   type=1  ;
   check =false;
  categories=[] ;
   
  constructor(private dialog:MatDialog, private globalService:GlobalService, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.listCategories();
  }
 
  listCategories() {
    this.globalService.allCategories().subscribe( categories => {
      console.log(categories['data']);
      this.categories = categories['data'];
    });
     console.log("Categories");
    console.log(this.categories) ;
  }

  onShowDetails(category) {
    let dialogRef = this.dialog.open( CategoryDetailsComponent, {
      data: category,
      height: '600px',
      width: '600px',
    });
  }
  onEditCategory(cat) {
    let dialogRef = this.dialog.open( EditCategoryComponent, {
      data: cat,
      height: '600px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe( res => this.listCategories() );
  }
  onDeleteCategory(cat_id) {
    this.spinner.show();
    this.globalService.deleteCategory(cat_id).subscribe(res =>{
      this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم حذف الفئة بنجاح',
        'success'
      )
      this.dialog.closeAll();
      this.listCategories();
    });
  }
 
}
