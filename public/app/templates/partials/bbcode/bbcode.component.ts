import { Component, Input } from '@angular/core';

@Component({
  selector: 'bbcode-toolbar',
  templateUrl: 'app/templates/partials/bbcode/bbcode.component.html'
})

export class BBCodeComponent {
  @Input('target') target = '';

  bbcodeList:any = [
    { code: 'b',       className: 'fa-bold'          },
    { code: 'i',       className: 'fa-italic'        },
    { code: 'u',       className: 'fa-underline'     },
    { code: 's',       className: 'fa-strikethrough' },
    { code: 'size',    className: 'fa-text-height'   },
    { code: 'url',     className: 'fa-link'          },
    { code: 'img',     className: 'fa-image'         },
    { code: 'code',    className: 'fa-code'          },
    { code: 'quote',   className: 'fa-quote-left'    },
    { code: 'color',   className: 'fa-paint-brush'   },
    { code: 'justify', className: 'fa-align-justify' },
    { code: 'center',  className: 'fa-align-center'  },
    { code: 'left',    className: 'fa-align-left'    },
    { code: 'right',   className: 'fa-align-right'   },
    { code: 'sub',     className: 'fa-subscript'     },
    { code: 'sup',     className: 'fa-superscript'   },
  ];

  constructor() {}

  public onClick(code: string): void {
    switch(code) {
      case 'url':
        this.addBBCodeToInput(`[${code}=http://heal.lv/]`, `[/${code}]`);
        break;
      case 'color':
        this.addBBCodeToInput(`[${code}=red]`, `[/${code}]`);
        break;
      case 'size':
        this.addBBCodeToInput(`[${code}=16]`, `[/${code}]`);
        break;
      default:
        this.addBBCodeToInput(`[${code}]`, `[/${code}]`);
    }
  }

  private addBBCodeToInput(startCode:string, endCode:string): void {
    let input = document.getElementById(this.target);
    let value = input['value'];
    let start = input['selectionStart'];
    let end = input['selectionEnd'];
    let selected = value.substring(start, end);

    let inserted = `${value.substring(0, start) + startCode + selected + endCode + value.substring(end)}`;
    input['value'] = inserted;
    let event = new Event('input');
    input.dispatchEvent(event);
  }
}
