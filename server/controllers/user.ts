import UserService = require('../service/user')
import { getUid } from '../tools/tools'


const _ = require('underscore')
const crypto = require('crypto')
const Router = require('koa-router')

const router = new Router({ prefix: '/api/user' })

router.get('/', async (ctx)=>{
	ctx.body = ctx.session.user
})

router.get('/logout', async (ctx)=>{
    ctx.session.user = undefined
    ctx.body = {}
})
 
router.post('/register', async (ctx)=>
{
    if( !ctx.request.body.username || !ctx.request.body.email || !ctx.request.body.password )
        ctx.throw(400, { message: '缺少字段' })

    const data =_.extend( _.pick(ctx.request.body, 'username', 'email'), { 
        _id: getUid(16), 
        password: crypto.createHash('md5').update(ctx.request.body.password).digest('hex'),
        created: Date.now()
    })
    
    const user = await UserService.register(data)
    ctx.body = user
})

router.post('/login', async (ctx)=>
{
    if( !ctx.request.body.username || !ctx.request.body.password ){
        return ctx.throw(400, 'missing parameters')
    }

    const data =_.extend( _.pick(ctx.request.body, 'username'), { 
        password: crypto.createHash('md5').update(ctx.request.body.password).digest('hex'),
    })
    
    const user = await UserService.login(data)

    ctx.session.user = _.pick(user, '_id', 'username', 'email')

    ctx.body = {}
})

export = router

declare function require(name:string)

