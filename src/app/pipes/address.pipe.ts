import { Pipe, PipeTransform } from '@angular/core';
import { UserAddress } from '../interfaces/user.interface';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(adress?: UserAddress): string {
    if (!adress) {
      return '';
    }

    return adress.street + ', ' + adress.suite + ', ' + adress.city + ' | ' + adress.zipcode;
  }
}
