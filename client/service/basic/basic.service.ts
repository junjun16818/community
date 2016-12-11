import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/toPromise' 
import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Headers, RequestOptions } from '@angular/http';

declare var escape, Date, unescape

export class BasicService<T>
{

    public http: Http; public base_url: string
    
    public opts = new RequestOptions({
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })



    public getOps(){
        var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InpoYW93ZW5sYWlAZ295b28uY29tIiwiZXhwIjoiMjAxNi0xMi0xM1QxNTo0Njo1NS43NTkyMTkxNjhaIiwib3JpZ19pYXQiOiIyMDE2LTEyLTExVDE1OjQ2OjU1Ljc1OTIxOTM4WiIsImlzX2FkbWluIjpmYWxzZX0.oppL6thXU5s_dCy5IdPXU24DZ0GeC1T57dP405o85xw'
        //5c851a74-e0bc-482b-8dc7-95576089ab62
        return new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        })
    }

    public list(): Promise<T[]>{
        return this._get(this.base_url)
    }

    public get(_id: string): Promise<T>{
        return this._get(`${this.base_url}/${_id}`)
    }
    
    public create(data: any): Promise<T>{
        return this._post(this.base_url, data)
    }

    public update(id: string, data: T): Promise<T>{
        return this._put(`${this.base_url}/${id}`, data)
    }

    public del(_id: String): Promise<null>
    {
        return this._del(`${this.base_url}/${_id}`)
    }

    public _get(url: string): Promise<any>
    {
        return this.http.get(url, this.opts)
            .toPromise()
            .then(response => {try{ return response.json() as T}catch(e){ return null}})
            .catch(this.handleError)
    }

    public _post(url: string, data: any): Promise<any>
    {
        return this.http.post(url, JSON.stringify(data) ,this.opts)
            .toPromise()
            .then(response =>  {try{ return response.json()}catch(e){ return null}})
            .catch(this.handleError)
    }

    public _put(url: string, data: any): Promise<any>
    {
        return this.http.put(url, JSON.stringify(data) ,this.opts)
            .toPromise()
            .then(response => null)
            .catch(this.handleError)
    }

    public _del(url: string): Promise<any>
    {
        return this.http.delete(url, this.opts)
            .toPromise()
            .then(response => null)
            .catch(this.handleError)
    }

    public handleError(error: any): Promise<any> {
        console.error('An error occurred', error.json()); // for demo purposes only
        return Promise.reject(error.json() || error);
    }

    public getDateAgo(date)
    {
        var time = new Date().getTime()
        var ct= time - date

        ct= ct/1000

        if( ct > 31104000 ) return parseInt(ct / 31104000 + '') + '年前'
        
        else if( ct > 2592000 ) return parseInt(ct / 2592000 + '') + '个月前'

        else if( ct > 86400*2 ) return parseInt(ct / 86400 + '') + '天前'

        else if( ct > 86400*2 ) return '昨天'

        else if( ct > 3600 ) return parseInt(ct / 3600 + '') + '小时前'

        else if( ct > 60 ) return parseInt(ct / 60 + '') + '分钟前'

        else if( ct > 0 ) return parseInt(ct + '') + '秒前'
    }
} 