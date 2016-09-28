import { Component, Input } from '@angular/core';

@Component({
  selector: 'bbcode-toolbar',
  templateUrl: 'app/templates/partials/bbcode/bbcode.component.html'
})

export class BBCodeComponent {
  @Input('target') target = '';

  bbcodeList:any = [
    { simple: true,  code: 'b',     className: 'fa-bold'        },
    { simple: true,  code: 'i',     className: 'fa-italic'      },
    { simple: true,  code: 'u',     className: 'fa-underline'   },
    { simple: false, code: 'url',   className: 'fa-link'        },
    { simple: false, code: 'img',   className: 'fa-image'       },
    { simple: true,  code: 'code',  className: 'fa-code'        },
    { simple: true,  code: 'quote', className: 'fa-quote-left'  },
    { simple: false, code: 'color', className: 'fa-paint-brush' },
  ];

  constructor() {}

  onClick(code: string): void {
    let input = document.getElementById(this.target);
    let value = input['value'];
    let start = input['selectionStart'];
    let end = input['selectionEnd'];
    let selected = value.substring(start, end);

    let inserted = `${value.substring(0, start)}[${code}]${selected}[/${code}]${value.substring(end)}`;
    input['value'] = inserted;
    let event = new Event('input');
    input.dispatchEvent(event);
  }
}
