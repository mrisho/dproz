import { serviceDetails, Attachment, StandardLocation } from "./common_data";
import { PostingIfo } from "../interfaces/domainData";


export class Project implements PostingIfo
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

    getPostingData():any{

        return {

            projectName: this.projectName,
            projectDescription: this.projectDescription,
            projectLocation: this.projectLocation,
            startDate: this.startDate,
            completedDate: this.completedDate,
            client: this.client,
            consent: this.consent,
            offeredServices: this.offeredServices,
            services: this.services
        }
    }
}



export class ClientDetails implements PostingIfo
{
    fistName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;

    getPostingData(){

        return {

            fistName: this.fistName,
            lastName: this.lastName,
            phoneNumber: this.phoneNumber,
            emailAddress: this.emailAddress
        }
    }
}

export class Consent implements PostingIfo
{ 
    text: string;
    acknowledged: boolean = true;
    signedOn: string;

    getPostingData()
    {
        return {
            text: this.text,
            acknowledged: this.acknowledged,
            signedOn:  this.signedOn,
        }
    }
}

