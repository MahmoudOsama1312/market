import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/products-interfaces';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() productData!: Product
  @Output() addToCart = new EventEmitter();
  showButton: boolean = false;
  addInTheCart:boolean = false
  amount :number = 0

  add() {     // you need to send the data + the Amount
    // this.addToCart.emit(this.productData)  // i send the product which i add to cart   [ Old ]
    this.addToCart.emit({ item: this.productData , quantity : this.amount})  // here h3ml object { key:value} 3lshn a3ml el count+ el api 3yz kda
  }

  showButtonFunction() {
    this.showButton = true;
  }
  showSuccessMessage() {
    this.addInTheCart = true;
  }
}
