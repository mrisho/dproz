import { Attachment } from './common_data';

export class CredentialClass 
{
   
    type: string;
    description: string;
    identificationNumber: string;
    issuedBy: string;
    effectiveDate: string;
    expiringDate: string;
    referenceId: string;
    attachment: Attachment;

    
    getCredential():any{

        return {

                type: this.type,
                description: this.description,
                identificationNumber: this.identificationNumber,
                issuedBy: this.issuedBy,
                effectiveDate: this.effectiveDate,
                expiringDate: this.expiringDate,
                referenceId: this.referenceId,
                attachment: this.attachment
        }
    }
}