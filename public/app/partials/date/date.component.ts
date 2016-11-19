import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'date-partial',
  template: `<span class='date-partial'>{{ date | date:format }}</span>`,
})

export class DatePartialComponent implements OnInit {
  dateFormats: any = {
    timeDate: 'j:mm, d. MMM y',
    dateOnly: 'd. MMM y',
    timeOnly: 'j:mm',
  };
  format: string = this.dateFormats.timeDate;

  @Input('date') date;
  @Input('type') type;

  ngOnInit(): void {
    this.format = this.dateFormats[this.type] || this.format;
  }
}
