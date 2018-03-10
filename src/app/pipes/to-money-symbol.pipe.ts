import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toMoneySymbol'
})
export class ToMoneySymbolPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(`La valeur monaie est ${value}`);
    switch(value.toLowerCase()) {
      case 'eu':
        return '€';
      case 'pounds':
        return '£';
      case 'cfa':
        return 'CFA';
      case 'CAD':
        return '$';
      default:
        return value;
    }
  }

}
