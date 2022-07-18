import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emoji'
})
export class EmojiPipe implements PipeTransform {

  transform(value?: string, code?: string): string {
    if (!value) return ''
     const arrSymbols = value.split('');
     arrSymbols.unshift(this.getEmoji(code) + ' ');
     
    return arrSymbols.join('');
  }

  private getEmoji(code?: string) {
    switch (code) {
      case 'name':
        return '🧍';
      case 'address':
        return '🏠';
      case 'website':
        return '🌐';
      case 'company':
        return '🏢';
      case 'phone':
        return '📱';
      case 'catchphrase':
        return '💬';
      case 'bs':
        return '💼';
      default:
        return '';
    }
  }

}
