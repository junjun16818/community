import CommentService = require('../service/comment')
import ReplyService = require('../service/reply')
import CategoryService = require('../service/category')

import { getUid } from '../tools/tools'

const Router = require('koa-router')
const _ = require('underscore')
const router = new Router({ prefix: '/api/comment' })
const community_name = 'angular'

router.get('/:topic_id', async (ctx)=>{
    console.log(ctx.params.topic_id)
	const comments = await CommentService.listByTopic(ctx.params.topic_id)

	comments.forEach(comment=>{
		
	})

	await Promise.all(comments.map(async (comment) => {
		comment.replyList = await ReplyService.listByComment(comment._id)
	}))
	
	ctx.body = comments
})

router.post('/', async (ctx)=>
{
	if( ctx.request.body.captcha !== ctx.session.captcha ){
		ctx.throw({ status: 400, message: '验证码错误'})
		return 
	}

	const category = await CategoryService.findByName(ctx.community._id, ctx.params.type)

	const data = {
		_id: getUid(16), 
		user_id: ctx.session.user._id,
		username: ctx.session.user.username,
		avatar: ctx.session.user.avatar || '/images/av1.png',
		vote: 0,
		community_id: ctx.community._id,
        topic_id: ctx.request.body.topic_id,
		html: ctx.request.body.html,
		markdown: ctx.request.body.markdown,
		created: Date.now()
	}

	const comment = await CommentService.create(data)

	ctx.body = comment
}) 

router.post('/vote', async (ctx)=>
{
	var num = 0
	if( ctx.request.body.type === 'up' )
		num = 1
	else 
		num = -1

	const result = await CommentService.vote(ctx.request.body.comment_id, ctx.session.user._id, num)
	
	if( result === 0 ){
		ctx.throw({ status: 400, message: '已经评分过了'})
	}

	ctx.body = result
})

router.post('/accept', async (ctx)=>{
	ctx.body = await CommentService.accept(ctx.request.body.topic_id, ctx.request.body.comment_id, ctx.session.user._id)
})

export = router

declare function require(name:string)
