import {
  AfterViewInit,
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'luv2shop-ecommerce';

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // reset cart data
    this.cartService.resetCartItems();
  }
}
