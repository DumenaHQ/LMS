// require.service.ts
import { Injectable } from '@angular/core';

declare const require: any;

@Injectable({
  providedIn: 'root'
})
export class RequireService {
  markdownIt(): any {
    return require('markdown-it'); // Use require here
  }
}
