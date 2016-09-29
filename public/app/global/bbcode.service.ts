var XBBCODE = require('XBBCODE');

import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable()
export class BBCodeService {
  ranges: string[] = [
    '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
    '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
    '\ud83d[\ude80-\udeff]'  // U+1F680 to U+1F6FF
  ];
  regexp: RegExp;

  constructor(private sanitizer: DomSanitizer) {
    this.regexp = new RegExp(this.ranges.join('|'), 'g');
  }

  parse(data: string): any {
    let object = XBBCODE.process({
      text: data,
      removeMisalignedTags: false,
      addInLineBreaks: true
    });

    var emojied = this.emojiSupport(object.html);
    return this.sanitizer.bypassSecurityTrustHtml(emojied);
  }

  private emojiSupport(data: string): string {
    return data.replace(this.regexp, "<span class='dynamic-no-emoji'>$&</span>");
  }
}
