import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { BasicService } from './basic/basic.service'
import { ICategory } from '../../interface/category'

@Injectable()

export class CategoryService extends BasicService<ICategory> 
{
    constructor(public http: Http) { super() }
    public base_url = '/api/category'
    
    findByName(name: string){
        return this._get(`${this.base_url}/key/${name}`)
    }
}

export { ICategory } 