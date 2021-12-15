import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Array<any>, search?: string): any {
    if (value && search)
      return value.filter((d) => d.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
    return value
  }

}
