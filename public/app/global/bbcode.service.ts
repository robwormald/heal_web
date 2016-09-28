var XBBCODE = require('XBBCODE');

import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable()
export class BBCodeService {
  constructor(private sanitizer: DomSanitizer) {}

  parse(data: string): any {
    let object = XBBCODE.process({
      text: data,
      removeMisalignedTags: false,
      addInLineBreaks: true
    });

    return this.sanitizer.bypassSecurityTrustHtml(object.html);
  }
}
