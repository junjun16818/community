import { ICommunity } from '../../interface/community'

import _Service = require('./_service')

class CommunityService extends _Service<ICommunity>
{
    constructor(){
        super('community') 
    }

    async findByName(name){
        return await this.db.findOne({keys: { $in: [name] }})
    }
}

export = new CommunityService
