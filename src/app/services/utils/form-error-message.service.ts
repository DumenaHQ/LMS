import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormErrorMessageService {

  constructor() { }

  getErrorMessage(errors: any, labelName: string) {    
    if (errors) {
      if (errors.required) {
        return `${labelName} is required.`;
      } 
      if (errors.email) {
        return `Email is invalid.`;
      } 
      if (errors.pattern) {
        if(errors.pattern.requiredPattern == '/^\\d+$/') {
          return `Only numerical values are allowed.`;
        }
        if(errors.pattern.requiredPattern == '/^[a-zA-Z ]+$/') {
          return `Only alpabets are allowed.`;
        }
      }
      if (errors.minlength) {
        const requiredLength = errors.minlength.requiredLength;
        return `Minimum length must be ${requiredLength} digits.`;
      }
      if (errors.maxlength) {
        const requiredLength = errors.maxlength.requiredLength;
        return `Maximum length must be ${requiredLength} digits.`;
      }
      if (errors.alphanumericSymbolPassword) {
        return `${labelName} must contain at least one letter, one digit and one symbol.`;
      }
    }
    
    return '';
  }

  // validate password
  alphanumericSymbolPasswordValidator() {
    return (control: FormGroup) => {
      const password = control.value;
  
      // Check if the password contains at least one letter (alphabetical character)
      const containsLetter = /[a-zA-Z]/.test(password);
  
      // Check if the password contains at least one digit (numerical character)
      const containsDigit = /\d/.test(password);
  
      // Check if the password contains at least one symbol (any symbol)
      const containsSymbol = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
  
      if (!containsLetter || !containsDigit || !containsSymbol) {
        // Return an error object if the password doesn't meet the criteria
        return { alphanumericSymbolPassword: true };
      }
  
      // Return null if the password is valid
      return null;
    };
  }
}
