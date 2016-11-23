import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { RatePartialService } from './rate.service';

@Component({
  moduleId: module.id,
  selector: 'rate-partial',
  templateUrl: './rate.component.html',
  providers: [RatePartialService]
})

export class RatePartialComponent implements OnInit, OnChanges {
  rateOptions: string[] = ['against', 'none', 'for'];
  showRateOptions: boolean;
  userIcon: string = 'none';
  ratingSum: string;
  ratings: any[] = [];
  currentRatings: any[] = [];

  @Input('id') id;
  @Input('type') type;
  @Input('data') data;

  constructor(private service: RatePartialService) {}

  ngOnChanges(): void {
    if(!this.data) return;

    this.recieveResponse(this.data);
  }

  ngOnInit(): void {
    if(this.data) return;

    this.service.getRating(this.id, this.type)
      .subscribe((res) => this.recieveResponse(res));
  }

  rate(method: string): void {
    this.service.setRating(this.id, this.type, method).subscribe((res) => {
      this.recieveResponse(res);
      this.showRateOptions = false;
    });
  }

  plusOrMinus(vote: boolean): string {
    return vote ? 'fa fa-plus' : 'fa fa-minus';
  }

  changePage(currentItems: any[]): void {
    this.currentRatings = currentItems;
  }

  private recieveResponse(res: any): void {
    if(!(res && res.ratings)) return;

    this.userIcon = this.service.getUserIcon(res.user);
    this.ratings = res.ratings;
    this.ratingSum = this.service.getRatingSum(this.ratings);
  }
}
