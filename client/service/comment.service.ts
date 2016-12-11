import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { BasicService } from './basic/basic.service'
import { IComment } from '../../interface/comment'
@Injectable()

export class CommentService extends BasicService<IComment> 
{
    constructor(public http: Http) { super() }
    public base_url = '/api/comment'

    public listByTopic(topic_id: string){
        return this._get(`${this.base_url}/${topic_id}`)
    }
    
    public vote(comment_id, type){
        return this._post(`${this.base_url}/vote`, {
            type: type,
            comment_id: comment_id
        })
    }

    public accept(topic_id, comment_id){
        return this._post(`${this.base_url}/accept`, {
            topic_id: topic_id,
            comment_id: comment_id
        })
    }

}
