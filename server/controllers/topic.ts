import TopicService = require('../service/topic')
import CategoryService = require('../service/category')
import TagService = require('../service/tag')

import { getUid, insertQDB } from '../tools/tools'

const Router = require('koa-router')
const _ = require('underscore')
const router = new Router({ prefix: '/api/topic' })
const community_name = 'angular'

router.get('/list/:type', async (ctx)=>
{
	const category = await CategoryService.findByName(ctx.community._id, ctx.params.type)

	if( !category )
		ctx.throw({ status: 400, message: 'category not found'})


	ctx.body = await TopicService.list(ctx.community._id, category._id)
	
	insertQDB(ctx, {
		action: 'topic_list'
	})
})

router.get('/:_id', async (ctx)=>
{
	ctx.body = await TopicService.get(ctx.params._id)

	insertQDB(ctx, {
		action: 'topic_detail',
		topic_id: ctx.body._id,
		topic_title: ctx.body.title,
		tags: ctx.body.tags
	})
})

router.post('/', async (ctx)=>
{
	
	if( ctx.request.body.captcha !== ctx.session.captcha ){
		ctx.throw({ status: 400, message: '验证码错误'})
		return 
	}

	ctx.request.body._id = getUid(16)
	ctx.request.body.created = Date.now()


	const category = await CategoryService.findByName(ctx.community._id, ctx.request.body.type)

	if( !category )
		ctx.throw({ status: 400, message: 'category not found'})

	const data = {
		_id: getUid(16), 
		title: ctx.request.body.title,
		tags: ctx.request.body.tags || [],
		tag_str: ctx.request.body.tags.join(' '),
		category_id: category._id,
		user_id: ctx.session.user._id,
		modify: Date.now(),
		community_id: ctx.community._id,
		username: ctx.session.user.username,
		avatar: ctx.session.user.avatar || 'images/av1.png',
		html: ctx.request.body.html,
		markdown: ctx.request.body.markdown,
		created: Date.now(),
		vote: 0,
		favorite: 0,
		content: ctx.request.body.content.substr(0, 300) + (ctx.request.body.content.length > 300 ? ' ...' : '')
	}

	const topic = await TopicService.create(data)
	
	for( let i = 0; i< topic.tags.length; i++ )
		await TagService.add(topic.community_id, topic.category_id, topic.tags[i])

	insertQDB(ctx, {
		action: 'topic_create',
		topic_id: ctx.params._id
	})

	ctx.body = topic
}) 

router.post('/vote', async (ctx)=>
{
	var num = 0
	if( ctx.request.body.type === 'up' )
		num = 1
	else 
		num = -1

	const result = await TopicService.vote(ctx.request.body.topic_id, ctx.session.user._id, num)
	
	ctx.body = result

	insertQDB(ctx, {
		action: 'topic_vote',
		topic_id: result._id,
		topic_titile: result.title,
		vote: ctx.request.body.type
	})
})

router.post('/favorite', async (ctx)=>
{
	
	const result = await TopicService.favorite(ctx.request.body.topic_id, ctx.session.user._id)
	
	ctx.body = result

	insertQDB(ctx, {
		action: 'topic_favorite',
		topic_id: result._id,
		topic_titile: result.title,
		vote: ctx.request.body.type
	})
})

router.post('/isFavorite', async (ctx)=>
{
	const result = await TopicService.isFavorite(ctx.request.body.topic_id, ctx.session.user._id)
	
	ctx.body = {
		_id: result
	}
})

router.post('/upload', async (ctx)=>{
	// console.log(ctx.request.files)
	console.log("Files: ", ctx.request.files);
    console.log(ctx.request.body);
})

export = router

declare function require(name:string)
