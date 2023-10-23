import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  skeletonProducts: Product[] = Array(8).fill({}); // Create skeleton cards
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName: string = '';
  searchMode: boolean = false;

  // fields for pagination
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;
  previousSearchInput: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const searchInput: string = this.route.snapshot.paramMap.get('keyword')!;

    // if we have a different searchInput than previous
    // then set pageNumber to 1
    if (this.previousSearchInput !== searchInput) {
      this.pageNumber = 1;
    }

    this.previousSearchInput = searchInput;

    // now search for the products using searchInput
    this.productService
      .searchProductsPaginate(this.pageNumber - 1, this.pageSize, searchInput)
      .subscribe(this.processResult());
  }

  handleListProducts() {
    // check if "id" param is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    } else {
      // no category id is available .. . default to category id 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    // check if we have different category than previous
    // NB: Angular will reuse a component if it is currently being viewed

    // if we have a different category id than previous then set pageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    // now get the products for the given category id
    this.productService
      .getProductListPaginate(
        this.pageNumber - 1,
        this.pageSize,
        this.currentCategoryId
      )
      .subscribe(this.processResult());
  }

  processResult() {
    return (data: any) => {
      // Reset the skeleton loader by setting skeletonProducts to an empty array
      this.skeletonProducts = [];

      this.products = data._embedded.products;
      // + 1 because pagination component:pages are 1 based however in spring data REST: pages are 0 based
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }

  updatePageSize(event: Event) {
    // @ts-ignore
    this.pageSize = event.target.value;
    this.pageNumber = 1;
    this.listProducts();
  }

  addToCart(product: Product) {
    const cartItem = new CartItem(product);

    this.cartService.addToCart(cartItem);
  }
}
