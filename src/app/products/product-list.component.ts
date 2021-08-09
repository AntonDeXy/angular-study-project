import { Component, OnInit, Pipe } from "@angular/core";
import { IProduct } from './products';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
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
    this.products = this.productService.getProducts()
    this.filteredProducts = this.products
    this.listFilter = ''
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message
  }
}