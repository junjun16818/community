import CommentService = require('../service/comment')
import ReplyService = require('../service/reply')
import CategoryService = require('../service/category')

import { getUid } from '../tools/tools'

const Router = require('koa-router')
const _ = require('underscore')
const router = new Router({ prefix: '/api/reply' })
const community_name = 'angular'

router.post('/', async (ctx)=>
{
	const data = {
		_id: getUid(16), 
		user_id: ctx.session.user._id,
		username: ctx.session.user.username,
		avatar: ctx.session.user.avatar || '/images/av1.png',
		community_id: ctx.community._id,
        topic_id: ctx.request.body.topic_id,
        content: ctx.request.body.content,
        comment_id: ctx.request.body.comment_id,
        to_username: ctx.request.body.to_username,
        to_user_id: ctx.request.body.to_user_id,
		created: Date.now(),
	}

	const comment = await ReplyService.create(data)

	ctx.body = comment
}) 

export = router

declare function require(name:string)
