import Mongodb = require('../tools/mongodb')
import { mongo_url } from '../conf/config'
import { ITopic } from '../../interface/topic'
import { IVoteHistory } from '../../interface/vote_history'
import { IFavorite } from '../../interface/favorite'

import _Service = require('./_service')
const db = Mongodb.connect(mongo_url)

interface IType{
    news: String
    question: String
    note: String
}

class TopicService extends _Service<ITopic>
{
    public db_name = 'topic'
    public UniqueKeys = this.collection<IVoteHistory>('unique_keys')
    constructor(){
        super('topic') 
    }

    public async list(community_id, category_id, page = 0){
        console.log({ community_id: community_id, category_id: category_id })
        return await this.db.find({ community_id: community_id, category_id: category_id }).limit(this.limit).skip(this.limit * page).sort({created: -1}).toArray()
    }

    public async vote (topic_id, user_id, num):Promise<any>
    {
        var vote = await this.UniqueKeys.findOne({ _id: topic_id + '-' + user_id })
        const topic = await this.get(topic_id)
        
        if( topic.user_id === user_id )
            throw({ status: 400, message: 'reject'})

        if( num > 0 && vote )
            throw({ status: 400, message: 'already scored'})

        if( num < 0 && vote ){
            await this.db.update({ _id: topic_id }, { $inc : { vote: num } })
            await this.UniqueKeys.deleteOne({ _id: topic_id + '-' + user_id }) 
        }else if( num > 0 && !vote ) {
            await this.db.update({ _id: topic_id }, { $inc : { vote: num } })
            await this.UniqueKeys.insert({ _id: topic_id + '-' + user_id }) 
        }

        return await this.db.findOne({ _id: topic_id })
    }

    public async favorite(topic_id, user_id): Promise<ITopic>
    {
        var favorite = await this.UniqueKeys.findOne({ _id: topic_id + '-' + user_id })
        
        if( favorite ){
            await this.UniqueKeys.deleteOne({ _id: topic_id + '-' + user_id }) 
            await this.db.update({ _id: topic_id }, { $inc : { favorite: -1 } })
        }else{
            await this.UniqueKeys.insert({ _id: topic_id + '-' + user_id }) 
            await this.db.update({ _id: topic_id }, { $inc : { favorite: 1 } })
        }

        return await this.db.findOne({ _id: topic_id })
    }

    public async isFavorite(topic_id, user_id){
        var favorite = await this.UniqueKeys.findOne({ _id: topic_id + '-' + user_id })

        if( favorite )
            return favorite._id
        else
            return ''
    }
}

export = new TopicService
