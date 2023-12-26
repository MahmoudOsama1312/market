import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent  implements OnInit {
  id: any;
  dataComingFromId: any
  loading: boolean = false;

  constructor(private _activatedRoute: ActivatedRoute , private  _productService: ProductsService) {
    this.id = this._activatedRoute.snapshot.paramMap.get('id') //here el id beta3y ay item a3ml 3leh click
    console.log(this.id)
  }
  ngOnInit(): void {
    this.getProductById()
  }

  getProductById() {
    this.loading = true;
    this._productService.getProductById(this.id).subscribe(res => {
      this.loading = false;
      this.dataComingFromId = res;
    }, error => {
      this.loading = false
      alert(error.message)
    })
  }
}
