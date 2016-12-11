import topicRouter = require('../controllers/topic')
import userRouter = require('../controllers/user')
import commentRouter = require('../controllers/comment')
import replyRouter = require('../controllers/reply')
import tagRouter = require('../controllers/tag')
import categoryRouter = require('../controllers/category')
import ComunityService = require('../service/community')
const Router = require('koa-router')

const ccap = require('ccap')({
	width: 160,
	generate:function(){
		var text = parseInt(Math.random()*10 + '') + '' + parseInt(Math.random()*10 + '') + '' +  parseInt(Math.random()*10 + '') + parseInt(Math.random()*10 + '')
		return text
	}
})
const community_name = 'angular'

export function routes(app)
{
	const router = new Router({ prefix: '' })
	
	router.get('/captcha', async (ctx)=>
	{
		const ary = ccap.get()
        const value = ary[0]
        const buf = ary[1]
 
		ctx.body = buf
		ctx.session.captcha = value
	})

	app.use(async (ctx, next)=>{

		ctx.community = await ComunityService.findByName(community_name)
		
		if( !ctx.community )
			ctx.throw({ status: 400, message: 'community not found'})
		
		await next()
	})
	
	app.use(router.routes())
	app.use(topicRouter.routes())
	app.use(userRouter.routes())
	app.use(commentRouter.routes())
	app.use(replyRouter.routes())
	app.use(tagRouter.routes())
	app.use(categoryRouter.routes())
}

declare function require(name:string);
declare var Math
