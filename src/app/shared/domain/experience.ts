import { serviceDetails, Attachment, StandardLocation } from "./common_data";


export class Project 
{
    projectName: string;
    projectDescription: string;
    projectLocation: StandardLocation;
    startDate: string;
    completedDate: string;
    client: ClientDetails;
    consent: Consent;
    offeredServices: string[];
    services: serviceDetails[];
    attachments: Attachment[];

    getValue():any{

        return {
            projectName: this.projectName,
            projectDescription: this.projectDescription,
            projectLocation: this.projectLocation,
            startDate: this.startDate,
            completedDate: this.completedDate,
            client: this.client,
            consent: this.consent,
            offeredServices: this.offeredServices,
            services: this.services,
            attachements: this.attachments
        }
    }
}



export class ClientDetails
{
    fistName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;

    getClient(){

        return {
            fistName: this.fistName,
            lastName: this.lastName,
            phoneNumber: this.phoneNumber,
            emailAddress: this.emailAddress
        }
    }
}

export class Consent{
    text: string;
    acknowledged: boolean = true;
    signedOn: string;

    getConsent()
    {
        return {
            text: this.text,
            acknowledged: this.acknowledged,
            signedOn:  this.signedOn,
        }
    }
}

