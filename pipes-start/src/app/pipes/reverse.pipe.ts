import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(string: string): any {
    return string.split('').reverse().join('');   
  }
}
