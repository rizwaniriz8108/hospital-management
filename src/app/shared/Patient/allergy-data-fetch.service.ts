import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllergyDataFetchService {
  API_URL: string = "http://localhost:8900/patient";
  constructor(private http:HttpClient) { }

  fetchAllergyTypeFromDatabase(): Observable<any>{
    return this.http.get<string[]>(this.API_URL + '/AllergyDataFromDatabase/getAllergyType');
  }

  fetchAllergyNameFromDatabase(allergyName:string){
    return this.http.get<string[]>(this.API_URL + '/AllergyDataFromDatabase/getAllergyNameByType/' + allergyName);
  }

  getAllergySourceByTypeAndName(type:any,name:any){
    return this.http.get<string[]>(this.API_URL + '/AllergyDataFromDatabase/getAllergySourceByTypeAndName/' + type + '/' + name);
  }

  getAllergyIsoformByTypeAndNameAndDescription(type:any,name:any,allergen:any){
    return this.http.get<string[]>(this.API_URL + '/AllergyDataFromDatabase/getAllergyIsoformByTypeAndNameAndDescription/' + type + '/' + name + '/' + allergen);
  }

  getAllergyIdByTypeAndNameAndDescriptionAndIsoform(type:any,name:any,allergen:any,isoform:any){
    return this.http.get<string[]>(this.API_URL + '/AllergyDataFromDatabase/getAllergyID/' + type + '/' + name + '/' + allergen + '/' + isoform);
  }

}
