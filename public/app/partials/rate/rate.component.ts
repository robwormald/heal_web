import { Component, Input, OnInit } from '@angular/core';

import { RatePartialService } from './rate.service';

@Component({
  moduleId: module.id,
  selector: 'rate-partial',
  templateUrl: './rate.component.html',
  providers: [RatePartialService]
})

export class RatePartialComponent implements OnInit {
  rateOptions: string[] = ['against', 'none', 'for'];
  showRateOptions: boolean;
  userIcon: string = 'none';
  ratings: any[] = [];

  @Input('id') id;
  @Input('type') type;

  constructor(private service: RatePartialService) {}

  ngOnInit(): void {
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

  private recieveResponse(res: any): void {
    this.userIcon = this.service.getUserIcon(res.user);
    this.ratings = res.ratings;
  }
}
