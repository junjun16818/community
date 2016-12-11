import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { BasicService } from './basic/basic.service'
import { ITopic } from '../../interface/topic'

@Injectable()

export class TopicService extends BasicService<ITopic> 
{
    constructor(public http: Http) { super() }
    public base_url = '/api/topic'
    
    listByType(type: string){
        return this._get(`${this.base_url}/list/${type}`)
    }
    
    public vote(topic, type){
        return this._post(`${this.base_url}/vote`, {
            type: type,
            topic_id: topic
        })
    }

    public favorite(topic_id){
        return this._post(`${this.base_url}/favorite`, { topic_id: topic_id })
    }
}

export { ITopic }