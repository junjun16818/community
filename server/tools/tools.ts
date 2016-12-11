
const qiniu = require('qiniu')
var Qsdk = require('qoncrete-sdk-node')
var client = new Qsdk.QoncreteClient({
    sourceID: '54746e54-4de2-4a52-b736-668ceafe7196',
    apiToken: '5c851a74-e0bc-482b-8dc7-95576089ab62',
	errorLogger: console.error
})

qiniu.conf.ACCESS_KEY = 'JvN5q2lbQDUt_Rl94eRldK5o00j_8Qqi3rI0CrUV'
qiniu.conf.SECRET_KEY = 'Y_U_GCPlW1BxJO2NQZrsFjx2cr6jr8JGkL7v__Dh'
const bucket = 'zai-io'
const key = 'angular-logo.png'

function uptoken(bucket, key) {
    const putPolicy = new qiniu.rs.PutPolicy(bucket + ':' + key)
    return putPolicy.token()
}

export function uploadFile(key, localFile, done) 
{
    const token = uptoken(bucket, key)

    const extra = new qiniu.io.PutExtra()
    qiniu.io.putFile(token, key, localFile, extra, function(err, ret) {
        if(!err) {
            done(null, 'http://7xszo9.com1.z0.glb.clouddn.com/' + ret.key)
        } else {
            done(err)
        }
    })
}

export function dateFormat(date, fmt) 
{
    const o = {
        'M+': date.getMonth() + 1, //月份 
        'd+': date.getDate(), //日 
        'h+': date.getHours(), //小时 
        'm+': date.getMinutes(), //分 
        's+': date.getSeconds(), //秒 
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度 
        'S': date.getMilliseconds() //毫秒 
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (let k in o)
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    return fmt
}


//调用uploadFile上传
// uploadFile(token, key, filePath)

// url = 'http://domain/key'
// var policy = new qiniu.rs.GetPolicy()

// //生成下载链接url
// var downloadUrl = policy.makeRequest(url)

// //打印下载的url
// console.log(downloadUrl)
const pattern = new RegExp('bot|crawl|spider|borg|yahoo|slurp|archiver|netresearch|lycos|scooter\
    |altavista|teoma|oegp|charlotte|http client|htdig|ichiro|mogimogi|larbin|pompos|scrubby\
    |searchsight|semanticdiscovery|snappy|speedy|voila|vortex|voyager|zao|zeal|dataparksearch\
    |findlinks|yottaamonitor|browsermob|httpmonitor|bingpreview|pagepeeker|webthumb|url2png|zooshot\
    |gomeza|google sketchup|read later|pingdom|facebook|rackspace|scan|link|ezine|preview\
    |dig|tarantula|urllib|jakarta|monitor|libwww|moozilla|seer|spice|snoopy|feedfetcher\
    |google wireless transcoder|netfront|archive|xenu|feed|appmanager|covario\
    |host|lwp|page speed|ptst|curl|digext|nutch|sleuth|yottaamonitor', 'i')

export function isBot(useragent){
    return pattern.test(useragent)
}

export function getUid(length) 
{
    var id = ''
	length = length || 20
	
    while (length--) {
        id += (Math.random() * 16 | 0) % 2 ? (Math.random() * 16 | 0).toString(16) : (Math.random() * 16 | 0).toString(16).toUpperCase()
    }
    return id.toLowerCase()
}

var getClientIP = function(req)
{
	var ipAddress;
	var headers = req.headers;
	var forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];

	forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
	
	if (!ipAddress) {
		ipAddress = req.connection.remoteAddress;
	}

	return ipAddress;
}

export function insertQDB(ctx, _data)
{
	var ip = getClientIP(ctx.req).replace('::ffff:', '')

    var data:any = {
		ip: ip,
		referer: ctx.req.headers['referer'],
		url: ctx.originalUrl.split('?')[0],
		ua: ctx.req.headers['user-agent'],
		ts: new Date()
	}

    if( ctx.session.user ){
        data.user_id = ctx.session.user._id,
        data.username = ctx.session.user.username
    }
    
    for( var key in _data ){
        data[key] = _data[key]
    }

	client.send(data)
}