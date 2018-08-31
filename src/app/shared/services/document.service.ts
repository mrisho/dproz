import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { SERVICING_DOMAIN } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  
  postDocument(file, attachmentParentReferenceId, attachmentCategory, attachmentDescription, thumbnail) {
    const options = {
      params: new HttpParams()
        .set('attachmentParentReferenceId', attachmentParentReferenceId)
        .set('attachmentCategory', attachmentCategory)
        .set('attachmentDescription', attachmentDescription)
        .set('thumbnail', thumbnail)
    };
    const uploadData = new FormData();
    uploadData.append('attachment', file, file.name);
    console.log(uploadData);
    
    return this.http.post(`${SERVICING_DOMAIN}/api/dproz/documents`, uploadData, options);
  }
  
  getDocument(image, userReference) {
    return this.http.get<any>(`${SERVICING_DOMAIN}/api/dproz/documents/${userReference}`);
  }
}
