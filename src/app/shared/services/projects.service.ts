import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVICING_DOMAIN } from '../constants/constants';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient, private state: StateService) { }


  getProjects(proReferenceId)
  {

    // let proReferenceId = JSON.parse(this.state.getCurrentUser()).userReferenceId;

    return this.http.get<any>(`${SERVICING_DOMAIN}/api/dproz/pros/${proReferenceId}/projects`);

    
  }

  getProject(proReferenceId,projectReferenceId)
  {

    // let proReferenceId = JSON.parse(this.state.getCurrentUser()).userReferenceId;

    return this.http.get<any>(`${SERVICING_DOMAIN}/api/dproz/pros/${proReferenceId}/projects/${projectReferenceId}`);

    
  }

  postProject(projectData)
  {

 
     let proReferenceId = JSON.parse(this.state.getCurrentUser()).userReferenceId;

    return this.http.post<any>(`${SERVICING_DOMAIN}/api/dproz/pros/${proReferenceId}/projects`,projectData );

    
  }

  putProject(proReferenceId,projectReferenceId, projectData)
  {

    // let proReferenceId = JSON.parse(this.state.getCurrentUser()).userReferenceId;

    return this.http.get<any>(`${SERVICING_DOMAIN}/api/dproz/pros/${proReferenceId}/projects/${projectReferenceId}`,projectData);

    
  }

  deleteProject(proReferenceId,projectReferenceId)
  {

    // let proReferenceId = JSON.parse(this.state.getCurrentUser()).userReferenceId;

    return this.http.get<any>(`${SERVICING_DOMAIN}/api/dproz//pros/${proReferenceId}/projects/${projectReferenceId}
    `);

    
  }
}
