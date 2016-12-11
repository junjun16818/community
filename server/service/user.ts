import Mongodb = require('../tools/mongodb')
import { mongo_url } from '../conf/config'

const db = Mongodb.connect(mongo_url)

class UserService
{
    private db = db.collection('users')
    
    constructor(){
        this.db.createIndex({ username: 1 }, { unique: true })
        this.db.createIndex({ email: 1 }, { unique: true })
    }

    public async list(type){
        
        return await this.db.find().sort({created: -1}).toArray()
    }

    public async login(data){
        const user =  await this.db.findOne({ $or: [{ 'username': data.username }, { email: data.username }], password: data.password })
        if( !user )
            throw({ status: 400, message: '用户名或密码错误' })

        return user
    }

    public async register(data)
    {
        try{
            await this.db.insert(data)
        }
        catch(e)
        {
            if( e.code === 11000 )
                throw({ message: '用户名或邮箱地址已存在', status: 400 })
             
            throw({ status: 400, message: '注册失败' })
        }

        return await this.db.findOne({ _id: data._id })

	// var user = _.extend(_.pick(data, 'username', 'email', 'password'), { _id: getUid(16)}),
    //     self = this 
	
	// Users.insert(user, function(err, status)
	// {
	// 	if( err ){
	// 		if( err.code === 11000 ){
	// 			err.err = ''
	// 			return done('用户名或邮箱已被注册')
	// 		}
			
	// 		return done(err.toString())
	// 	}
		
	// 	Users.findById(user._id, function(err, user)
    //     {
    //         if( !user )
    //             return done('user not found')
            
    //         done(err, user)
            
    //         self.sendValidateEmail(user, function(err){
                
    //         })
	// 	})
	// })

        // await this.db.insert(data)
        // return await this.db.findOne({ _id: data._id })
    }
}

export = new UserService




