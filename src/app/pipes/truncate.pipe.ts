import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {

  transform(value?: string | null | undefined, limit: number = 20): string {
    if (!value) {
      return '';
    }

    return value.length > limit ? value.slice(0, limit) + '...' : value;
  }
}
