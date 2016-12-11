import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { BasicService } from './basic/basic.service'
import { IReply } from '../../interface/comment'

@Injectable()

export class ReplyService extends BasicService<IReply> 
{
    constructor(public http: Http) { super() }
    public base_url = '/api/reply'

    public listByComment(comment_id: string){
        return this._get(`${this.base_url}/${comment_id}`)
    }
    
}
