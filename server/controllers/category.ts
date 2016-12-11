import TagService = require('../service/tag')
import ComunityService = require('../service/community')
import categoryService = require('../service/category')

import { getUid } from '../tools/tools'

const Router = require('koa-router')
const _ = require('underscore')
const router = new Router({ prefix: '/api/category' })
const community_name = 'angular'

router.get('/key/:name', async (ctx)=>{
    const community = await ComunityService.findByName(community_name)
	ctx.body = await categoryService.findByName(community._id, ctx.params.name)
})

router.get('/:_id', async (ctx)=>{
	ctx.body = await categoryService.get(ctx.params._id)
})


export = router

declare function require(name:string)
 