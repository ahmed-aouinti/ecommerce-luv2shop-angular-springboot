import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  orderHistoryList: OrderHistory[] = [];
  skeletonOrderHistoryList: OrderHistory[] = Array(8).fill({}); // Create skeleton cards
  storage: Storage = sessionStorage;

  constructor(private orderHistoryService: OrderHistoryService) {}

  ngOnInit(): void {
    this.handleOrderHistory();
  }

  handleOrderHistory() {
    // read the customer's email address from browser storage
    const email = JSON.parse(this.storage.getItem('userEmail'));

    // retrieve data from REST API using OrderHistoryService
    this.orderHistoryService.getOrderHistory(email).subscribe((data) => {
      this.orderHistoryList = data._embedded.orders;
      this.skeletonOrderHistoryList = [];
    });
  }
}
