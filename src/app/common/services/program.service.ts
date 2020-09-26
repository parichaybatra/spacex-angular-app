import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  constructor(private http: HttpClient) {}

  public baseUrl: string = 'https://api.spacexdata.com/v3/launches?'; // kept it public for testing

  getPrograms(paramsd: HttpParams) {
    return this.http.get<any>(this.baseUrl, { params: paramsd });
  }
}
