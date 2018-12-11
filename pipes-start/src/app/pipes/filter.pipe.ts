import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(array: any, filterString: string, propName: string): any {
    if(filterString === '') {
      return array;
    }
    return array.filter(object => {
      return object[propName] === filterString;
    })
  }
}
