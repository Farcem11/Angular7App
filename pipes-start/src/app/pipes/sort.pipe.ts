import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  compare(objectA, objectB, property) {
    if (objectA[property] < objectB[property])
      return -1;
    if (objectA[property] > objectB[property])
      return 1;
    return 0;
  }

  transform(array: Object[], property: string): any {
    return array.sort((objectA, objectB) => this.compare(objectA, objectB, property));
  }
}
