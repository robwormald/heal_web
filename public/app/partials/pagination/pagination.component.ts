import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'pagination',
  templateUrl: 'pagination.component.html'
})

export class PaginationPartialComponent implements OnChanges {
  @Input('total') totalCount:number;
  @Input('page') currentPage:number = 1;
  @Input('url') redirectUrl:string;
  @Input('per') perPage:number = 10;
  @Input('side') sideCount:number = 3;
  @Input('items') items:any[];
  @Output() onPage = new EventEmitter();

  lastPage: number;
  pageArray: number[];
  currentItems: any[];
  shouldShow: boolean = false;

  ngOnChanges(): void {
    this.lastPage = Math.ceil((this.totalCount/this.perPage) || 1);
    let page = this.currentPage || 1;

    let sides = {
      left: this.createArray(page - this.leftSide(page), page),
      right: this.createArray(page, page + this.rightSide(page)),
    }

    let array = [1, ...sides.left, page, ...sides.right, this.lastPage];
    this.pageArray = this.uniq(array);
    this.shouldShow = this.pageArray.length > 1;
    if(this.items) {
      setTimeout(() => this.setCurrentItems(this.currentPage), 1);
    }
  }

  onClick(page: number): void {
    if(this.items) {
      this.currentPage = page;
      this.setCurrentItems(page);
    }
  }

  private setCurrentItems(page: number): void {
    let start = (page - 1) * this.perPage;
    let next = start + this.perPage;
    this.currentItems = this.items.slice(start, next);
    this.onPage.emit(this.currentItems);
  }

  private createArray(start: number, end: number): number[] {
    let array = [];
    for(let i = start; i <= end; i++) { array.push(i); }
    return array;
  }

  private uniq(array: number[]): number[] {
    return Array.from(new Set(array));
  }

  private leftSide(page: number): number {
    let left = page - 1;
    return left < this.sideCount ? left : this.sideCount;
  }

  private rightSide(page: number): number {
    let right = this.lastPage - page;
    return right < this.sideCount ? right : this.sideCount;
  }
}
