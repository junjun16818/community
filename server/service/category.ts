

import { ICategory } from '../../interface/category'

import _Service = require('./_service')

class CategoryService extends _Service<ICategory>
{
    constructor(){
        super('category') 
    }

    async findByName(community_id, name){
        return await this.db.findOne({ community_id: community_id, key: name })
    }
}

export = new CategoryService
