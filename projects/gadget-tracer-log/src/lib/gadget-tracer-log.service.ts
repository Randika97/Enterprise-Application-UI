import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})

export class GadgetTracerLogService {

  constructor(protected httpClient: HttpClient) { }

  //get all employee details with search results
  getEmployee(requestObj?: any): Observable<any> {
    let params = new HttpParams();
    params = requestObj.first ? params.append('first', requestObj.first) : params;
    params = requestObj.maxResults ? params.append('maxResults', requestObj.maxResults) : params;
    params = requestObj.date_to ? params.append('date_to', requestObj.date_to) : params;
    params = requestObj.date_from ? params.append('date_from', requestObj.date_from) : params;
    params = requestObj.first_name ? params.append('first_name', requestObj.first_name) : params;
    params = requestObj.last_name ? params.append('last_name', requestObj.last_name) : params;
    params = requestObj.gender ? params.append('gender', requestObj.gender) : params;
    params = requestObj.district ? params.append('district', requestObj.district) : params;

    return this.httpClient.get<any>('/misaka-stores/V1/example/getEmployee', { params: params });
  }
  //get all districts from the database
  getDistcrict(): Observable<any> {
    return this.httpClient.get<any>(`/misaka-stores/V1/example/getAllDistricts`);
  }
  //Create and update a Employee
  createUser(user: any): Observable<any> {
    return this.httpClient.post<any>(`/misaka-stores/V1/example/saveUser`, user);
  }
  //Get a employee by ID
  getEmployeebyID(id: string): Observable<any> {
    return this.httpClient.get<any>(`/misaka-stores/V1/example/userById/${id}`);
  }
  //Delete a employee by ID
  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`/misaka-stores/V1/example/deleteUserById/${id}`);
  }

}
