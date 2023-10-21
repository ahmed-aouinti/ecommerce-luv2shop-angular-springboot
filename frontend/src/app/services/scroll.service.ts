import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private scrollSubject = new Subject<boolean>();

  constructor() {
    window.addEventListener('scroll', () => {
      const isScrolledDown = window.scrollY > 0;
      this.scrollSubject.next(isScrolledDown);
    });
  }

  getScrollObservable() {
    return this.scrollSubject.asObservable();
  }
}
