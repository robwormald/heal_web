import { Component, Input, AfterViewChecked } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bbcode-partial',
  templateUrl: 'bbcode.component.html'
})

export class BBCodePartialComponent implements AfterViewChecked {
  @Input('target') target = '';
  addedEventListener: boolean = false;

  emojiList:string[] = [
    "😀", "😂", "😄", "😇", "😉", "😊", "😋", "😍", "😘", "😜",
    "😛", "😎", "😏", "😑", "😒", "😠", "😡", "😔", "😕", "😤",
    "😱", "😨", "😯", "😢", "😴", "💤", "💩", "😈", "👿", "🐶",
    "🐱", "🐰", "🐼", "🐯", "🐷", "🙈", "🙉", "🙊", "❤️", "💔"
  ];

  emoticonsList:any = {
    '<3': '❤️', '</3': '💔',
    ':D': '😀', ';D': '😂',
    ']:)': '😈', ']:(': '👿',
    ':)': '😊', ';)': '😏',
    ':(': '😔', ';(': '😢',
    ':p': '😛', ';p': '😜',
    ':o': '😯', ';o': '😱',
    ':@': '😡', ';@': '😠',
    ':|': '😑', ';|': '😪',
    ":\\": '😕', ";\\": '😒',
    ':*': '😘', ';*': '😚',
    '8)': '😎', ':zzz:': '😴',
  };

  bbcodeList:any[] = [
    { code: 'b',       className: 'fa-bold'          },
    { code: 'i',       className: 'fa-italic'        },
    { code: 'u',       className: 'fa-underline'     },
    // { code: 's',       className: 'fa-strikethrough' },
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

  constructor() { }

  ngAfterViewChecked(): void {
    if(this.addedEventListener) return;

    let input = document.getElementById(this.target);
    console.error(this.target, input);
    if(input) {
      this.addedEventListener = true;
      input.addEventListener('keyup', (e) => {
        for(let emoticon in this.emoticonsList) {
          let replaced = emoticon.replace(/([()[{*+.$^\\|?])/g, '\\$1');
          let regex = new RegExp(replaced, 'gim');
          input['value'] = input['value'].replace(regex, this.emoticonsList[emoticon]);
          this.updateWithAngular(input);
        }
      });
    }
  }

  public onClick(code: string, emoji: string): void {
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
      case 'emoji':
        this.addBBCodeToInput('', emoji);
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
    this.updateWithAngular(input);
  }

  private updateWithAngular(input: any): void {
    let event = new Event('input');
    input.dispatchEvent(event);
  }
}
