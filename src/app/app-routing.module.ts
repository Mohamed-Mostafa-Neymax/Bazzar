import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WrongRouteComponent } from './components/auth/errors/wrong-route/wrong-route.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { CategoryModule } from './components/categories/category.module';
import { ServicesModule } from './components/services/services.module';
import { ReportsModule } from './components/reports/reports.module';
import { TagsModule } from './components/tags/tags.module';
import { VouchersModule } from './components/vouchers/vouchers.module';
import { BannersModule } from './components/banners/banners.module';
import { DeliveryFeeModule } from './components/delivery-fee/delivery-fee.module';
 
 
 
const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'auth/login',component:LoginComponent},
  {
    path: '',
    // canActivate: [AuthGuard],
    component: DashboardLayoutComponent,
    children: [
      // {path:'',component:HomeComponent, data: { title: 'الصفحة الرئيسية' }},
      {path:'home',component:HomeComponent, data: { title: 'تقارير الشركة' }},
      // {path:'profile',component:ProfileComponent, data: { title: 'بيانات الشركة' }},
    ]
  },
  {
     
    path: 'app',
    // canActivate: [AuthGuard],
    component: DashboardLayoutComponent,
    children: [
      { path: 'categories', loadChildren: () => CategoryModule },
      { path: 'hometags', loadChildren: () => TagsModule },
      { path: 'banners', loadChildren: () => BannersModule },
      { path: 'vouchers', loadChildren: () => VouchersModule },
      { path: 'services', loadChildren: () => ServicesModule },
      {path:'reports',loadChildren:()=>ReportsModule},
      { path: 'delivery-fee', loadChildren: () => DeliveryFeeModule }
    ]
  },
  {
    path        : '**',
    pathMatch   : 'full',
    component   : WrongRouteComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
