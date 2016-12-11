import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { BasicService } from './basic/basic.service'
import { ITags } from '../../interface/tags'

@Injectable()

export class TagService extends BasicService<ITags> 
{
    constructor(public http: Http) { super() }
    public base_url = '/api/tag'
    
    listByCategory(type: string){
        return this._get(`${this.base_url}/${type}`)
    }
}

export { ITags }