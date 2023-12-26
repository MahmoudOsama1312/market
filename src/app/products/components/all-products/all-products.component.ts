import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products-interfaces';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  productsArray: Product[] = [];
  categoriesArray: string[] = [];
  loading: boolean = false;
  CategoriesTitle = 'Categories'
  cartProducts:any[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories()
  }

  getAllProducts() {
    this.loading = true
    this.productsService.getAllProducts().subscribe((res: any) => {
      this.productsArray = res
      this.loading = false
    }, error =>
        alert(error.message))
  }

  getAllCategories() {
    this.loading = true
    this.productsService.getAllCategories().subscribe((res: any) => {
      this.categoriesArray = res
      this.loading = false
    }, error => {
      alert(error.message)
    })
  }

  // show the selected category     ( Filter )
  selectedCategory(event: any) {
    let typeOfCategory = event.target.value;
    if (typeOfCategory == 'all') {
      this.getAllProducts()
    } else {
      this.getProductsByCategory(typeOfCategory) // i called the down function here to give it the result of selected category
    }
  }

  getProductsByCategory(keyword: string) {
    this.loading = true
    this.productsService.getProductsByCategory(keyword).subscribe((res: any) => {
      this.productsArray = res;
      this.loading = false
    })
  }
  // to add to the cart , we need to do 3 steps :
  // 1- receive from the localstorage
  //2- update the cart with selected products
  //3- update the localstorage ( overriding )

  addToCart(product: any) {        // here el product after adding el {} b2a msh direct , lih key el awel called item ( check the child)
    console.log(product)  // da el product beta3y
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);  // ( ! ) to avoid the problem of (null)
      // here we receive the data from the localStorage (cart)

      // Filtering the Carts ( Not Repeating the Product)
      let exist = this.cartProducts.find(item => item.item.id == product.item.id) // hena b2olo lw fe item gwa el cart ==product id el lessa hados 3leh ,
      if (exist) {                                         //the second (item) is key
        alert("Already in the cart ")
      } else {
           this.cartProducts.push(product)
      localStorage.setItem('cart',JSON.stringify(this.cartProducts))  // Overriding
    // ana hena b2olo setItem esmo Cart in ( LocalStorage ) , w 5od feh el product beta3y zay ma hwa
      }

    } else {
      this.cartProducts.push(product)    // we neglected the first step bcz it will get (null)
      localStorage.setItem('cart',JSON.stringify(this.cartProducts))
    }
  }

}
