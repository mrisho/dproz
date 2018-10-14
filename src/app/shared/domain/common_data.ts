export class serviceDetails {

    serviceId: string;
    serviceNumber: string;
    serviceSubcategory: string;
    serviceCategory: string;
    serviceDescription: string;
    languageIndicator: string;

    getService(){

        return {

        serviceId: this.serviceId,
        serviceNumber: this.serviceNumber,
        serviceSubcategory: this.serviceSubcategory,
        serviceCategory: this.serviceCategory,
        serviceDescription: this.serviceDescription,
        languageIndicator: this.languageIndicator

        }
    }
}

export class Attachment
{

    referenceId: string;
    parentReferenceId: string;
    category: string; 
    url: UrlClass;
    thumbnail: boolean = true;
    userReferenceId: string;
    description: string;
    createdDate: string;

    getAttachment(){

        return {
        referenceId: this.referenceId,
        parentReferenceId: this.parentReferenceId,
        category: this.category,
        url: this.url,
        thumbnail: this.thumbnail,
        userReferenceId: this.userReferenceId,
        description: this.description,
        createdDate: this.createdDate
        }
    }
}


export class StandardLocation
{
    longitude: number;
    latitude: number;
    street: string;
    county: string;
    zip: string;
    city: string;
    region: string;
    country: string;

    getLocation(){

        return {

            longitude: this.longitude,
            latitude: this.latitude,
            street: this.street,
            county: this.county,
            zip: this.zip,
            city: this.city,
            region: this.region,
            country: this.country
        }
    }
}

export class UrlClass
{
    url: string;
     
    getUrl(){

        return {

            url: this.url
        }
    }
   
}
