import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FieldService{
    private host: string;
    constructor(private http:Http){
        this.host = "http://138.197.19.63/";
    }

    getFields() : any{
        let docURL = this.host + "fields/";
        let params = new URLSearchParams();
        params.set('format', 'json');

        return this.http.get(docURL, {search: params}).map((response) => response.json());
    }


    getConditionField(fieldId: string) : any{
        let docURL = this.host + "conditions/";
        let params = new URLSearchParams();
        params.set('format', 'json');
        params.set('field', fieldId);

        return this.http.get(docURL, {search: params}).map((response) => response.json());
    }

    getResult(conditionsIds: string) : any{
        let docURL = this.host + "result/";
        let params = new URLSearchParams();
        params.set('format', 'json');
        params.set('conditions', conditionsIds);
        return this.http.get(docURL, {search: params}).map((response) => response.json());
    }

}