import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/shared/constants';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }


  getAllProducts() {
    return this.http.get(Constants.PRODUCTS_API_URL)
  }

  getAllCategories() {
    return this.http.get(Constants.ALL_CATEGORIES_API_URL)
  }

  getProductsByCategory(keyword: string) {
    return this.http.get(Constants.PRODUCTS_BY_CATEGORIES_API_URL+ keyword )
  }

  // to get the products by id  (Details Page )
  getProductById(id: any) {
    return this.http.get(Constants.PRODUCT_BY_ID_FOR_DETAILS_PAGE +id)
  }
}
