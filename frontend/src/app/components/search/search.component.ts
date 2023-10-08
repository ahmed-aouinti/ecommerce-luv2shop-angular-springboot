import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(private router: Router) {}

  doSearch(value: string) {
    this.router.navigateByUrl(`/search/${value}`);
  }

  ngOnInit(): void {}
}
