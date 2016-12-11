import Mongodb = require('../tools/mongodb')
import { mongo_url } from '../conf/config'
import { ITags } from '../../interface/tags'
import { getUid } from '../tools/tools'

import _Service = require('./_service')
const db = Mongodb.connect(mongo_url)

class TagService extends _Service<ITags>
{
    public db_name = 'tags'
    constructor(){
        super('tags') 
    }

    public async listByType(category_id, community_id){
        return await this.db.find({ category_id: category_id, community_id: community_id }).sort({ count: 1 }).toArray()
    }

    public async add(community_id, category_id, tag)
    {
        const _tag = await this.db.findOne({ name: tag, category_id: category_id, community_id: community_id })

        if( !_tag ){
            return await this.db.insert({ _id: getUid(16), name: tag, category_id: category_id, community_id: community_id, count: 1 })
        }
        else {
            return await this.db.update({ _id: _tag._id }, { $inc: { count: 1 }})
        }
    }

    public async minus(community_id, category_id, tag){
        return await this.db.update({ name: tag, category_id: category_id, community_id: community_id }, { $inc: { count: -1 }})
    }
}

export = new TagService
