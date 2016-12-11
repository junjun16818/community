import TagService = require('../service/tag')
import ComunityService = require('../service/community')

import { getUid } from '../tools/tools'

const Router = require('koa-router')
const _ = require('underscore')
const router = new Router({ prefix: '/api/tag' })
const community_name = 'angular'

router.get('/:category_id', async (ctx)=>{
    const community = await ComunityService.findByName(community_name)
	ctx.body = await TagService.listByType(ctx.params.category_id, community._id)
})


export = router

declare function require(name:string)
