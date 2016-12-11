import Mongodb = require('../tools/mongodb')
import { mongo_url } from '../conf/config'
import { IComment } from '../../interface/comment'
import { IVoteHistory } from '../../interface/vote_history'

import _Service = require('./_service')
import TopicService = require('./topic')
const db = Mongodb.connect(mongo_url)


class CommentService extends _Service<IComment>
{
    public db_name = 'comment'
    public limit = 20
    public VoteColl = this.collection<IVoteHistory>('vote_history')
    constructor(){
        super('comment') 
    }

    public async listByTopic (topic_id: string, page = 0){
        return await this.db.find({ topic_id: topic_id }).limit(this.limit).skip(this.limit * page).toArray()
    }

    public async vote (comment_id, user_id, num):Promise<any>
    {
        var vote = await this.VoteColl.findOne({ _id: comment_id + '-' + user_id })
        const comment = await this.get(comment_id)

        if( comment.user_id === user_id )
            throw({ status: 400, message: 'reject'})

        if( num > 0 && vote )
            throw({ status: 400, message: 'already scored'})

        if( num < 0 && vote ){
            await this.db.update({ _id: comment_id }, { $inc : { vote: num } })
            await this.VoteColl.deleteOne({ _id: comment_id + '-' + user_id }) 
        }else if( num > 0 && !vote ) {
            await this.db.update({ _id: comment_id }, { $inc : { vote: num } })
            await this.VoteColl.insert({ _id: comment_id + '-' + user_id }) 
        }

        return await this.db.findOne({ _id: comment_id })
    }

    public async accept(topic_id, comment_id, user_id)
    {
        const topic = await TopicService.get(topic_id)
        const comment = await this.get(comment_id)

        if( user_id !== topic.user_id )
            throw({ status: 400, message: 'permission denied' })
        if( topic.user_id === comment.user_id )
            throw({ status: 400, message: 'reject' })
        
        await TopicService.update(topic._id, <any>{ accept_comment_id: comment._id })
        return await TopicService.get(topic._id)
    }
}


export = new CommentService
