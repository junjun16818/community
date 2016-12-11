import Mongodb = require('../tools/mongodb')
import { mongo_url } from '../conf/config'

const db = Mongodb.connect(mongo_url)

class _Service<T>
{
    public db_name = ''
    public db = db.collection<T>(this.db_name)
    public limit = 20

    constructor(db_name){
        this.db_name = db_name
        this.db = db.collection<T>(this.db_name)
    }

    public collection<T>(db_name){
        return db.collection<T>(db_name)
    }

    public async list(type, page = 0){
        return await this.db.find({}).limit(this.limit).skip(this.limit * page).sort({created: -1}).toArray()
    }

    public async get(_id){
        return await this.db.findOne({ _id: _id })
    }

    public async create(data: T){
        console.log(data)
        await this.db.insert(data)
        console.log(data['_id'])
        return await this.db.findOne({ _id: data['_id'] })
    }

    public async update(_id: string, data: T){
        await this.db.update({_id: _id}, {$set: data})
        return await this.db.findOne({ _id: _id })
    }
}

export = _Service
