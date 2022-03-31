import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ServiceAddComponent } from './service-add/service-add.component';
const routes: Routes = [
  {path:'list',component:ListComponent , data :{title:'قائمة الخدمات'}},
  // {path:'add',component:ServiceAddComponent , data : {title:'إضافة خدمة'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
