import { Component, OnInit, Pipe } from "@angular/core";
import { IProduct } from './products';
import { ProductService } from './product.service';
import { Subscription } from "rxjs";

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List'
  imageWidth: number = 50
  imageMargin: number = 2
  showImage = false
  filteredProducts: IProduct[] = []
  products: IProduct[] = []
  errorMessage: string = ''
  sub!: Subscription

  private _listFilter: string = ''

  get listFilter(): string {
    return this._listFilter
  }

  set listFilter(value: string) {
    this._listFilter = value
    console.log('In setter:', value)
    this.filteredProducts = this.performFilter(value)
  }

  constructor(private productService: ProductService) { }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase()
    return this.products.filter(product => product.productName.toLocaleLowerCase().includes(filterBy))
  }

  toggleImage(): void {
    this.showImage = !this.showImage
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products
        this.filteredProducts = this.products
      },
      error: err => this.errorMessage = err
    })
    this.listFilter = ''
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message
  }
}