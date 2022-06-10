import { Injectable } from '@angular/core';
import { Client } from '../entities/client';
import { MiaBaseCrudHttpService } from '@agencycoda/mia-core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from '../entities/reponse-model';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends MiaBaseCrudHttpService<Client> {

  constructor(
    protected http: HttpClient
  ) {
    super(http);
    this.basePathUrl = environment.baseUrl + 'client';
  }

  public getClients(): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.basePathUrl}/list`, {});
  }

  public saveClients(cliente: Client): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.basePathUrl}/save`, cliente);
  }

  public deleteClient(id: number): Observable<ResponseModel> {
    return this.http.delete<ResponseModel>(`${this.basePathUrl}/remove/${id}`);
  }

}