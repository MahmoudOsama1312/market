import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartProducts: any[] = []
  totalPrice: number = 0
  success : boolean = false

  constructor( private _cartsService: CartsService) { }

  ngOnInit(): void {
    this.getProductToCart()
    this.getTotalPrice()
  }

  getProductToCart() {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);  // ( ! ) to avoid the problem of (null)
      console.log(this.cartProducts)
    }
    this.getTotalPrice()
  }

  getTotalPrice() {
    this.totalPrice = 0
    this.cartProducts.map(res =>
      this.totalPrice += res.item.price * res.quantity)
  }
  //minus and Plus buttons:
  getMinus(index:number) {
    this.cartProducts[index].quantity--        // b7added el index beta3 el item el ana 3aleh , w lmma ados click y3ml minus
    localStorage.setItem('cart',JSON.stringify(this.cartProducts)) // update el localstorage b2a ( Overriding) bel new data
    this.getTotalPrice()  // update el totalPrice  Bardo
  }

  getPlus(index:number) {
    this.cartProducts[index].quantity++
    localStorage.setItem('cart',JSON.stringify(this.cartProducts)) // update el localstorage b2a ( Overriding) bel new data
    this.getTotalPrice()
  }

  detectChangesInInputField() {     // update the Input Field
     localStorage.setItem('cart',JSON.stringify(this.cartProducts)) // update el localstorage b2a ( Overriding) bel new data
      this.getTotalPrice()
  }

  deleteProduct(index : number) {
    this.cartProducts.splice(index, 1)
    localStorage.setItem('cart',JSON.stringify(this.cartProducts))
  }

  clearShoppingCart() {
    this.cartProducts = []
    localStorage.setItem('cart', JSON.stringify(this.cartProducts))
    this.getTotalPrice()
  }
  sendProductsToBackEnd() {
    let productInfo = this.cartProducts.map(item => {
      return { productId: item.item.id , quantity : item.quantity }
    })
    let model = {
      userId: 5,
      date: new Date(),
      products: productInfo

    }
    this._cartsService.sendToBackend(model).subscribe(res => {
      this.success = true;
   })
  }
}
