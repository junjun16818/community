import Mongodb = require('../tools/mongodb')
import { mongo_url } from '../conf/config'
import { IReply } from '../../interface/comment'

import _Service = require('./_service')
const db = Mongodb.connect(mongo_url)


class ReplyService extends _Service<IReply>
{
    public db_name = 'reply'
    public limit = 20
    constructor(){
        super('reply') 
    }

    public async listByComment (comment_id: string, page = 0){
        return await this.db.find({ comment_id: comment_id }).limit(this.limit).skip(this.limit * page).toArray()
    }
}

export = new ReplyService 
