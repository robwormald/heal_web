import { Injectable } from '@angular/core';

@Injectable()
export class EmojiSupportService {

  init(): void {
    if(this.isLinux() || !this.hasEmojiSupport()) {
      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = '.dynamic-no-emoji { font-family: "Noto Emoji, Apple Color Emoji, SegoeUIEmoji"; }';
      document.getElementsByTagName('head')[0].appendChild(style);
    }
  }

  private isLinux(): boolean {
    var version = navigator.appVersion;
    return version.includes("X11") || version.includes('Linux');
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
