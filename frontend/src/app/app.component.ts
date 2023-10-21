import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { ScrollService } from './services/scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'luv2shop-ecommerce';
  isScrolledDown: boolean = false;

  constructor(
    private cartService: CartService,
    private scrollService: ScrollService
  ) {}

  ngOnInit() {
    // reset cart data
    this.cartService.resetCartItems();
    this.scrollService
      .getScrollObservable()
      .subscribe((isScrolledDown) => (this.isScrolledDown = isScrolledDown));
  }
}
