import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { TopicService, ITopic } from '../../../service/topic.service'
import { CommentService } from '../../../service/comment.service'
import { ReplyService } from '../../../service/reply.service'
import { UserService } from '../../../service/user.service'
import { CategoryService } from '../../../service/category.service'
import { QoncreteService } from '../../../service/qoncrete.service'

declare var $, editormd, _

@Component({
    selector: 'topic',
    styleUrls: ['./detail.css'],
    templateUrl: './detail.html'
})

export class TopicComponent implements OnInit
{
    private topic: ITopic = <any>{}
    private comments = []
    private replyList = [{}, {}, {}]
    private user = this.userService.user
    private replyInput
    private replyPlaceholder
    private replyValue
    private editor
    private getDateAgo 
    private category = {}
    private pageView = 0
    private data = { title: 'test topic', captcha: '1234'}
    constructor(private activatedRoute: ActivatedRoute, private _service: TopicService, private commentService: CommentService, private replyService: ReplyService, private userService: UserService, private categoryService: CategoryService, private qoncreteService: QoncreteService)
    {
        console.log(this.userService.user)
        // this.user = userSerivce.user
        this.getDateAgo = this.replyService.getDateAgo

        

    }

    ngOnInit()
    {
        const _id = this.activatedRoute.snapshot.params['_id']

        this.qoncreteService.getTopicPageView(_id).then(pageView=>{
            this.pageView = pageView
        })
        this._service.get(_id).then(topic=>{
            this.topic = topic
            this.categoryService.get(topic.category_id).then(category=>{
                this.category = category
            })

            setTimeout(()=> {
                this.markdownToHtml('test-editormd')
            })

            this.getComments()
        })
    }

    private getComments()
    {
        this.commentService.listByTopic(this.topic._id).then(comments=>{
            this.comments = comments

            setTimeout(()=> {
                this.comments.forEach(comment=>{
                    this.markdownToHtml(comment._id)
                })
            })
        }).catch(err=>{
            this.danger(err.message)
        })
    }

    private comment(captcha)
    {
        const data: any = { 
            captcha: captcha,
            topic_id: this.topic._id,
            markdown: this.editor.getMarkdown(),
            html: this.editor.getHTML()
        }
        
        this.commentService.create(data).then(comment=>{
            comment.replyList = []
            this.comments.push(comment)
            setTimeout(()=> {
                this.markdownToHtml(comment._id)
            })

            this.success('评论成功！')
        }).catch(err=>{
            this.danger(err.message)
        })
    }

    private voteTopic(type){
        if( this.userService.user._id === this.topic.user_id )
            return 

        this._service.vote(this.topic._id, type).then(_topic=>{
            this.topic.vote = _topic.vote
        }).catch(err=>{
            console.log(err)
        })
    }

    private favorite(){
        this._service.favorite(this.topic._id).then(topic=>{
            this.topic.favorite = topic.favorite
        })
    }

    private vote(comment, type)
    {
        if( this.userService.user._id === comment.user_id )
            return 

        this.commentService.vote(comment._id, type).then(_comment=>{
            comment.vote = _comment.vote
        }).catch(err=>{
            console.log(err)
        })
    }

    private accept(comment){
        if( this.userService.user._id !== this.topic.user_id )
            return 

        this.commentService.accept(this.topic._id, comment._id).then(_topic=>{
            this.topic.accept_comment_id = _topic.accept_comment_id
        }).catch(err=>{
            console.log(err)
        })
    }

    private danger(text)
    {
        $.niftyNoty({
            type: 'danger',
            container : 'floating',
            html : text,
            timer : 3000
        })
    }

    private success(text)
    {
        $.niftyNoty({
            type: 'dark',
            container : 'floating',
            html : text,
            timer : 3000
        })
    }

    private markdownToHtml(_id)
    {
        editormd.markdownToHTML(_id, {
            htmlDecode      : 'style,script,iframe',  // you can filter tags decode
            emoji           : true,
            taskList        : true,
            tex             : true,  // 默认不解析
            flowChart       : true,  // 默认不解析
            sequenceDiagram : true,  // 默认不解析
            path    : 'editor.md/lib/'
        }, 500)
    }

    ngAfterViewInit()
    {
        var testEditor
        
        this.editor = this.createEditorMd('editor', {image : true})
        
    }

    private createEditorMd(id, options?:Object)
    {
        const defaultOptions = 
        {
            height:250,
            toolbarIcons : ()=>
            {
                const arr = ["bold", "hr", "del","italic", "|", "code", "preformatted-text", "code-block", "image", "link", "|", "h1", "h2", "h3", "h4", "h5", "h6", "|","list-ul","list-ol","table", "search", "||", "watch", "fullscreen", "preview", "help"]
                if( !options['image'] )
                    arr.splice(8, 1)
                    
                return arr
            },
            saveHTMLToTextarea: true,
            imageUpload : true,
            imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL : "/api/topic/upload",
            autoFocus: false,
            path : '/editor.md/lib/'
        }
        
        return editormd(id, _.extend(defaultOptions, options))
    }


    private replyComment:any = {}
    private toReply:any = {}
    private setReplyInput(data, to){
        this.replyComment = data

        if( to ){
            this.toReply.username = to.username
            this.toReply.user_id = to.user_id
        }else{
            this.toReply.username = data.username
            this.toReply.user_id = data.user_id
        }
    }   

    private reply(replyText)
    {
        const data = {
            comment_id: this.replyComment._id,
            content: replyText.value,
            to_username: this.toReply.username,
            to_user_id: this.toReply.user_id,
            topic_id: this.topic._id
        }

        this.replyService.create(data).then(reply=>{
            console.log(reply)
            this.replyComment.replyList = this.replyComment.replyList || []
            this.replyComment.replyList.push(reply)
            replyText.value = ''
        }).catch(err=>{
            console.log(err)
        })


        console.log(data)
    }

    private fefe(){
        console.log(123)
    }

    
}
