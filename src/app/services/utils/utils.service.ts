import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  imageToBase64(imageFile: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!imageFile) {
        reject(new Error('No image file provided'));
        return;
      }
      const reader = new FileReader();
  
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert image to base64'));
        }
      };
  
      reader.onerror = () => {
        reject(new Error('Error occurred while reading image file'));
      };
  
      reader.readAsDataURL(imageFile);
    });
  }  
}
