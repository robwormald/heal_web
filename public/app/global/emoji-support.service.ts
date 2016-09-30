import { Injectable } from '@angular/core';

@Injectable()
export class EmojiSupportService {

  init(): void {
    let font = this.shouldAddSupport();

    if(font.length) {
      let style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = `.dynamic-no-emoji { font-family: ${font}; }`;
      document.getElementsByTagName('head')[0].appendChild(style);
    }
  }

  private shouldAddSupport(): string {
    switch(true) {
      case window['mobilecheck']():
        return 'Noto Emoji, Apple Color Emoji, SegoeUIEmoji';
      case this.isLinux():
      case !this.hasEmojiSupport():
        return 'SegoeUIEmoji';
      default:
        return '';
    }
  }

  private isLinux(): boolean {
    var version = navigator.appVersion;
    return version.includes('X11') || version.includes('Linux');
  }

  private hasEmojiSupport(): boolean {
    var pixelRatio = window.devicePixelRatio || 1;
    var offset = 12 * pixelRatio;
    var node = document.createElement('canvas');

    // canvastext support
    if(!node.getContext || !node.getContext('2d') || typeof node.getContext('2d').fillText !== 'function') {
      return false;
    }

    var ctx = node.getContext('2d');

    ctx.fillStyle = '#f00';
    ctx.textBaseline = 'top';
    ctx.font = '32px Arial';
    ctx.fillText('😬', 0, 0);
    return ctx.getImageData(offset, offset, 1, 1).data[0] !== 0;
  }
}
