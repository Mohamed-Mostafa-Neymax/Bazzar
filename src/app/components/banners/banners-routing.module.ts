 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBannersComponent } from './add-banners/add-banners.component';
import { ListBannersComponent  } from './list-banners/list-banners.component';
 

const routes: Routes = [
  {path:'list',component:ListBannersComponent , data: {title: 'قائمة البانارات'}},
  {path:'add',component: AddBannersComponent , data:{title:'إضافة بانر'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannersRoutingModule { }
