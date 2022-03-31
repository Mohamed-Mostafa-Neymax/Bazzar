import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  Voucher:any ;
  public location: any = [];
  private locationSource = new  BehaviorSubject(this.location);
  private currentLocation = this.locationSource.asObservable();

  constructor(private http:HttpClient) {
    this.locationSource = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('location')));
  }
   // Bazzar Banners : 
      allBanners(){
        return this.http.get(`${environment.endpoint}/user/banners/all`);
      }
      getBannersById(banner_id) {
        return this.http.get(`${environment.endpoint}/user/banner/show?banner_id=${banner_id}`) ; 
      }
      addBanner(banner) {
        return this.http.post(`${environment.endpoint}/admin/banner/create`,banner) ; 
      }
      editBanner(banner) {
        return this.http.post(`${environment.endpoint}/admin/banner/update`,banner) ; 
      }
    deleteBanner(banner_id) {
      return this.http.delete(`${environment.endpoint}/admin/banner/delete?banner_id=${banner_id}`) ; 
    }
  // Bazzar Categories : 
    allCategories(){
    return this.http.get(`${environment.endpoint}/user/categories/all?language_symbol=ar`)
    }
    getCategoryById(id){
      return this.http.get(`${environment.endpoint}/user/category/show?language_symbol=ar&category_id=${id}`) ; 
    }
    addCategory(category){
      return this.http.post(`${environment.endpoint}/admin/category/create`, category);
    }
    
    editCategory(category){
      return this.http.post(`${environment.endpoint}/admin/category/update`,category) ; 
    }
    deleteCategory(category_id){
      return this.http.delete(`${environment.endpoint}/admin/category/delete?category_id=${category_id}`) ; 
    }
    //Bazzar HomeTags : 
     allAllHomeTags(){
      return this.http.get(`${environment.endpoint}/user/home-tags/all?language_symbol=ar`)
      }
     addHomeTags(tag){
        return this.http.post(`${environment.endpoint}/admin/home-tag/create`,tag) ; 
      }
     editHomeTags(tag){
        return this.http.post(`${environment.endpoint}/admin/home-tag/update`,tag) ; 
      }
     deleteHomeTags(tag_id){
        return this.http.delete(`${environment.endpoint}/admin/home-tag/delete?home_tag_id=${tag_id}`) ; 
      }

      //Bazzar Voucher :
       allVouchers(){
        return this.http.get(`${environment.endpoint}/admin/vouchers/all`);
        }
        allVouchersById(voucher_id){ 
          return this.http.get(`${environment.endpoint}/admin/category/delete?category_id=${voucher_id}`)
        }

      addVouchers(voucher){
          return this.http.post(`${environment.endpoint}/admin/voucher/create`,voucher) ; 
        }

      editVouchers(voucher_name, voucher_id, discount_percentage){
        return this.http.put<any>(`${environment.endpoint}/admin/voucher/update?name=${voucher_name}&voucher_id=${voucher_id}&discount_percentage=${discount_percentage}`, {});
      }
      deleteVouchers(voucher_id){
        return this.http.delete(`${environment.endpoint}/admin/voucher/delete?voucher_id=${voucher_id}`) ; 
      }
////////////////////////////////////////////////////////////////////////////
  // Category

  // allCategories(){
  //   return this.http.get(`${environment.endpoint}/shop/categories/all`);
  // }
  // allCategoriesDeliveryServices() {
  //   return this.http.get(`${environment.endpoint}/user/categories/all?type=2`);
  // }
  // addCategory(category){
  //   return this.http.post(`${environment.endpoint}/shop/category/add`, category);
  // }
  // deleteCategory(category_id){
  //   return this.http.delete(`${environment.endpoint}/admin/category/delete?category_id=${category_id}`);
  // }
///////////////////Start From : Country //////////////////
allCountries(){
  return this.http.get(`${environment.endpoint}/user/countries/all`);
}

addCountry(country){
  return this.http.post(`${environment.endpoint}/admin/country/create`, country);
}
 
editCountry(country){
return this.http.post(`${environment.endpoint}/admin/country/edit` , country);
}

deleteCountry(country_id) {
  return this.http.delete(`${environment.endpoint}/admin/country/delete?country_id=${country_id}`) ;
}
/////////////////////City///////////////////////////

getCityByCountryId(country_id) {
  return this.http.get(`${environment.endpoint}/user/cities/all?country_id=${country_id}`);
}

addCity(city) {
  return this.http.post(`${environment.endpoint}/admin/city/create` , city) ;
}

editCity(city){
  return this.http.post(`${environment.endpoint}/admin/city/edit` , city);
}
deleteCity(city_id){
 return this.http.delete(`${environment.endpoint}/admin/city/delete?city_id=${city_id}`);
}



//////////////////////Category//////////////////////////
allUserCategory(type){
return this.http.get(`${environment.endpoint}/user/categories/all?type=${type}`)
}
addAdminCategory(category){
  return this.http.post(`${environment.endpoint}/admin/category/create`,category) ; 
}

editAdminCategory(category){
  return this.http.post(`${environment.endpoint}/admin/category/edit`,category) ; 
}
deleteAdminCategory(category_id){
  return this.http.delete(`${environment.endpoint}/admin/category/delete?category_id=${category_id}`) ; 
}
/////////////////////SubCategory///////////////////////////

allUserSubCategory(category_id){
  return this.http.get(`${environment.endpoint}/user/subcategories/all?category_ids[0]=${category_id}`)
}
addAdminSubCategory(subCategory){
 return this.http.post(`${environment.endpoint}/admin/subcategory/create`,subCategory)
}
editAdminSubCategory(subCategory){
return this.http.post(`${environment.endpoint}/admin/subcategory/edit`,subCategory)
}

deleteAdminSubCategory(subCategory_id) {
return this.http.delete(`${environment.endpoint}/admin/subcategory/delete?subcategory_id=${subCategory_id}`)
}
////////////////////// End //////////////////////////

  uploadImage(f){
    return this.http.post(`http://pomac.info/oneapp/public/api/user/files/add`, f);
  }
  
  addFilter(filterObj) { return this.http.post(`${environment.endpoint}/admin/filter/create`, filterObj); }
  editFilter(filterObj) { return this.http.post(`${environment.endpoint}/admin/filter/edit`, filterObj); }
  appendFilterShop(filterShopObj) { return this.http.post(`${environment.endpoint}/admin/filter/append`, filterShopObj); }
  deleteFilter(filter_id_Obj) { return this.http.delete(`${environment.endpoint}/admin/filter/delete?filter_id=${filter_id_Obj}`); }
  listFilters() { return this.http.get(`${environment.endpoint}/filters/all`); }
  
  // Tags Requests
  addTag(tagObj) { return this.http.post(`${environment.endpoint}/admin/hometag/create`, tagObj);} 
  editTag(tagObj) { return this.http.post(`${environment.endpoint}/admin/hometag/edit`, tagObj); }
  appendTagShop(tagShopObj) { return this.http.post(`${environment.endpoint}/admin/home-tag/store/append`, tagShopObj); }
  removeTagShop(user_id: number, home_tag_id: number) { 
    return this.http.delete(`${environment.endpoint}/admin/home-tag/store/delete?user_id=${user_id}&home_tag_id=${home_tag_id}`); }
  deleteTag(tag_id_Obj) { return this.http.delete(`${environment.endpoint}/admin/hometag/delete?home_tag_id=${tag_id_Obj}`); }
  listTags() { return this.http.get(`${environment.endpoint}/user/hometags/all`); }
  
  // Shops Requests
  addShop(shopObj) {
    const formData = new FormData();
    for( let key in shopObj ) {
      if( key == 'shop_categories' ) {
        for( let c = 0; c < shopObj['shop_categories'].length; c++ ) {
          formData.append('shop_categories['+c+']', shopObj['shop_categories'][c].id);
        }
      } else if( key == 'shop_subcategories' ) {
        for( let c = 0; c < shopObj['shop_subcategories'].length; c++ ) {
          formData.append('shop_subcategories['+c+']', shopObj['shop_subcategories'][c].id);
        }
      } else {
        formData.append(key, shopObj[key]);
      }
    }
    return this.http.post(`${environment.endpoint}/admin/shop/register`, formData);
  }
  deleteShop(shop_id_Obj) { return this.http.delete(`${environment.endpoint}/admin/shop/delete?shop_id=${shop_id_Obj}`); }
  listShops() { return this.http.get(`${environment.endpoint}/admin/show/users?type_id=${4}`); }
  
  // Categories
  listCategories(filter_type) { return this.http.get(`${environment.endpoint}/user/categories/all?type=${filter_type}`); }
  listSubCategories(category_id) { return this.http.get(`${environment.endpoint}/user/subcategories/all?category_ids[0]=${category_id}`); }

  // Delivery Companies Requests
  addDeliveryCompany(Company_obj) { return this.http.post(`${environment.endpoint}/admin/delivery/company/register`, Company_obj); }
  deleteDeliveryCompanies(id) { return this.http.delete(`${environment.endpoint}/admin/delivery/company/delete?delivery_company_id=${id}`); }
  listDeliveryCompanies() { return this.http.get(`${environment.endpoint}/admin/delivery/company/all`); }

  // Vouchers
  addVoucher(voucher_obj) { return this.http.post(`${environment.endpoint}/admin/voucher/create`, voucher_obj); }
  editVoucher(voucher_obj) { return this.http.post(`${environment.endpoint}/admin/voucher/edit`, voucher_obj); }
  deleteVoucher(id) { return this.http.delete(`${environment.endpoint}/admin/voucher/delete?voucher_id=${id}`); }
  listVouchers() { return this.http.get(`${environment.endpoint}/admin/vouchers/all`); }

  // User Services
  setUserStatus(updatedStatus) {
    return this.http.post(`${environment.endpoint}/admin/check/applications`, updatedStatus);
  }
  listUsers(type_id, status_id) { 
    return this.http.get(`${environment.endpoint}/admin/show/users?type_id=${type_id}&status_id=${status_id}`);
  }

  // Delivery Fee Requests
  addDeliveryFee(deliveryFee_obj) { return this.http.post(`${environment.endpoint}/admin/set/delivery-fee`, deliveryFee_obj);}
  editDeliveryFee(editedDeliveryFee_obj) { return this.http.post(`${environment.endpoint}/admin/update/delivery-fee`, editedDeliveryFee_obj); }
  showDeliveryFee() { return this.http.get(`${environment.endpoint}/show/delivery-fee`); }
}
