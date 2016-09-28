import 'bbCodeParser';
declare let BBCodeParser:any;

import { Injectable } from '@angular/core';

@Injectable()
export class BBCodeService {
  parser:any = new BBCodeParser(BBCodeParser.defaultTags());

  parse(data: string): string {
    return this.parser.parseString(data);
  }
}
