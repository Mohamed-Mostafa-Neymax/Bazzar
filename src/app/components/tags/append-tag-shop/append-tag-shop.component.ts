import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-append-tag-shop',
  templateUrl: './append-tag-shop.component.html',
  styleUrls: ['./append-tag-shop.component.scss']
})
export class AppendTagShopComponent implements OnInit {

  appendTagForm: FormGroup;

  tagSettings = {};
  tagList = [];

  shopSettings = {};
  shopList = [];


  constructor( private globalService: GlobalService, private dialog: MatDialog, private spinner: NgxSpinnerService ) { }
  ngOnInit(): void {
    this.appendTagForm = new FormGroup({
      'shop_id': new FormControl(null, Validators.required),
      'home_tag_id': new FormControl(null, Validators.required)
    });
    this.onAll_Shops_Tags()
    
    // this.filterList = [{programaticValue: 0, showedValue: 'مجاني'}, {programaticValue: 1, showedValue: 'له سعر'}];
    this.tagSettings = {
          singleSelection: true,
          idField: 'id',
          textField: 'name_ar',
          // selectAllText: 'اختيار الكل ',
          unSelectAllText: 'الغاء الاختيار',
          itemsShowLimit: 10,
          allowSearchFilter: false
    };

    // this.shopList = [{programaticValue: 0, showedValue: 'مجاني'}, {programaticValue: 1, showedValue: 'له سعر'}];
    this.shopSettings = {
          singleSelection: true,
          idField: 'id',
          textField: 'name',
          // selectAllText: 'اختيار الكل ',
          unSelectAllText: 'الغاء الاختيار',
          itemsShowLimit: 10,
          allowSearchFilter: false
    };
  }

  onAll_Shops_Tags() {
    this.globalService.allAllHomeTags().subscribe( tagsRes => {
      console.log('tagsRes', tagsRes);
      this.tagList = tagsRes['data'];
    });
    this.globalService.listShops().subscribe( shopsRes => {
      console.log('shopsRes', shopsRes);
      this.shopList = shopsRes['data'];
    });
  }

  onSelectShop(item: any) {
    console.log(item);
  }
  onSelectAllShops(items: any) {
    console.log(items);
  }
  
  onSelectFilter(item: any) {
    console.log(item);
  }
  onSelectAllFilters(items: any) {
    console.log(items);
  }

  onSubmit() {

    console.log({home_tags_ids: this.appendTagForm.value.home_tag_id[0]['id'], user_id: this.appendTagForm.value.shop_id[0]['id']});
    this.spinner.show();
    let formData = new FormData();
    formData.append('home_tags_ids[0]', this.appendTagForm.value.home_tag_id[0]['id']);
    formData.append('user_id', this.appendTagForm.value.shop_id[0]['id']);

    this.globalService.appendTagShop(formData)
      .subscribe( addTagToShop => {
      this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم أضافة العلامة للمتجر بنجاح',
        'success'
      );
      this.dialog.closeAll();
      console.log('addFilterShopRes', addTagToShop);
    });
  }

}
