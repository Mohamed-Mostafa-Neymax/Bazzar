import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';



import { EditBannersComponent } from '../edit-banners/edit-banners.component';
 
import { map } from 'rxjs/operators';
 
// import { CategoryDetailsComponent } from '../category-details/category-details.component';
  

@Component({
  selector: 'app-list-banners',
  templateUrl: './list-banners.component.html',
  styleUrls: ['./list-banners.component.scss']
})
export class ListBannersComponent implements OnInit {

  filterForm:FormGroup ;
   type=1  ;
   check =false;
   banners=[] ;
   
  constructor(private dialog:MatDialog, private globalService:GlobalService, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.listBanners();
  }
 
  listBanners() {
    this.globalService.allBanners().subscribe( ban => {
      console.log(ban['data']);
      this.banners = ban['data'];
    });
     console.log("Categories");
    console.log(this.banners ) ;
  }

 
  onEditBanner(banner) {
    let dialogRef = this.dialog.open( EditBannersComponent, {
      data: banner,
      height: '600px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe( res =>this.listBanners() );
  }
  onDeleteBanner(banner_id) {
    this.spinner.show();
    this.globalService.deleteBanner(banner_id).subscribe(res =>{
      this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم حذف الفئة بنجاح',
        'success'
      )
      this.dialog.closeAll();
      this.listBanners();
    });
  }
 

}
