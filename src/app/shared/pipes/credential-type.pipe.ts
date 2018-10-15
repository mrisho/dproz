import { CredentialType } from './../domain/credential';
import { Pipe, PipeTransform } from '@angular/core';
import { CredentialsService } from '../services/credentials.service';

@Pipe({
  name: 'credentialType'
})
export class CredentialTypePipe implements PipeTransform {

  credentialTypes: CredentialType[];

  constructor(private credentialService: CredentialsService)
  {
       this.credentialTypes = credentialService.getCredentiaTypes();
  }

  transform(value: any, args?: any): any {
    
    let newValue = value;

    let filtered = this.credentialTypes.filter( x => x.Id == value);

    if(filtered.length > 0)
    newValue = filtered[0].Name;

    return newValue;
  }

}
