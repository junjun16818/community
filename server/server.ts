const Koa = require('koa')
const session = require('koa-session')
const convert = require('koa-convert')
const serve = require('koa-static')
const koaBody = require('koa-body')
const body = require('koa-better-body')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
import { routes } from './conf/routes'

app.keys = ['some secret hurr']
app.use(session(app))
app.use(convert(session(app)))
app.use(serve(__dirname + '/../client'))
app.use(koaBody({ formidable:{ uploadDir: __dirname + '/../server/uploads' }}))
// app.use(convert(body({
//     IncomingForm: formidable
// })))

app.use(async function(ctx, next){
    try {
        await next()
    } catch (err) {
        console.log(err.message)
        ctx.body = { message: err.message || err };
        ctx.status = err.status || 500;
    }
})

routes(app)
app.listen(8118)

console.log('listen 8117')

declare function require(name:string)


// const http = require('http')
// const path = require('path')
// const express = require('express')
// const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
// const cookieSession = require('cookie-session')

// import { routes } from './conf/routes' 
// import { port } from './conf/config'

// const app = express()
// app.use(express.static(path.join(__dirname, '../../dist/client')))
// app.use(bodyParser.json())
// app.use(cookieParser())
// app.use(cookieSession({
//   	name: 'session',
// 	httpOnly: false,
//   	keys: ['key1', 'key2']
// }))

// routes(app)

// http.createServer(app).listen(port)

// console.log('listen port ' + port)