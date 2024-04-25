import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {

  transform(value?: string, ...args: number[]): unknown {
    const limit = args.length > 0 ? args[0] : 20;

    return (value || '').length > limit
    ? (value || '').slice(0, limit) + "..."
    : value;
  }
}
