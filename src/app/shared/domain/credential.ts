import { Attachment } from './common_data';
import { PostingIfo } from '../interfaces/domainData';


export class CredentialType
{
      Id : string;
      Name : string;
}

export class CredentialClass implements PostingIfo
{
   
    type: string;
    description: string;
    identificationNumber: string;
    issuedBy: string;
    effectiveDate: string;
    expiringDate: string;
    referenceId: string;
    attachment: Attachment;

    
    getPostingData():any{

        return {

                type: this.type,
                description: this.description,
                identificationNumber: this.identificationNumber,
                issuedBy: this.issuedBy,
                effectiveDate: this.effectiveDate,
                expiringDate: this.expiringDate,
                referenceId: this.referenceId
            
        }
    }
}