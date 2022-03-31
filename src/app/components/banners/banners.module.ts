import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannersRoutingModule } from './banners-routing.module';
 
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BannersRoutingModule,
    ReactiveFormsModule ,
    NgMultiSelectDropDownModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class BannersModule { }
