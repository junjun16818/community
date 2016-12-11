import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TopicService } from '../../../service/topic.service'
import { NgForm } from '@angular/forms'
declare var $, editormd, _

@Component({
    selector: 'topic-form',
    styleUrls: ['./form.css'],
    templateUrl: './form.html'
})

export class TopicFormComponent 
{
    private topicType = ''
    private banner = ''
    private title = ''
    private tags
    private editor
    private data = { title: 'test topic', captcha: '1234'}
    constructor(private activatedRoute: ActivatedRoute, private router: Router, private _service: TopicService)
    {
        this.topicType = activatedRoute.snapshot.params['type']
        this.banner = `/images/blog-banner-${activatedRoute.snapshot.params['type']}.png`
        this.title = this.topicType==='news'?'创建文章':this.topicType==='question'?'我要提问': this.topicType==='note'?'创建笔记': ''
    }
    
    ngAfterViewInit()
    {
        this.editor = this.createEditorMd('editor', {image : true})

        setTimeout(()=> {
            var places = [
                {name: "New York"}, 
                {name: "Los Angeles"},
                {name: "Copenhagen"},
                {name: "Albertslund"},
                {name: "Skjern"}  
            ]

            this.tags = $('#tags').tagsinput({
                tagClass: (item)=> {
                    return 'label label-primary'
                },
                maxTags: 5,
                maxChars: 10,
                trimValue: true,
                // typeaheadjs: {
                //     source: function(q, done){
                //         done(places.map((item)=>{
                //             return item.name
                //         }))
                //     },
                //     afterSelect: function() {
                //         console.log(this.$element)
                //         this.$element[0].value = '';
                //     }
                // }
            })

        });
    }

    private create(f: NgForm)
    {
        const data = f.value

        data.markdown = this.editor.getMarkdown()
		data.html = this.editor.getHTML()
		data.content = data.html.replace(/<([^>]*)>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        
        data.tags = $('#tags').tagsinput('items')
        data.type = this.topicType
        
        if( !data.captcha || data.captcha.length !== 4 ){
            this.danger('请输入验证码')
            return false
        }

        if( !data.tags.length ){
            this.danger('请输入标签！')
            return false
        }

        if( !data.markdown || !data.html || !data.content ){
            this.danger('请输入内容！')
            return false
        }

        if( !data.title ){
            this.danger('请输入标题！')
            return false
        }
        
        this._service.create(data).then((data)=>{
            this.success('创建成功！')
            this.router.navigate([`/${this.topicType}`])
        }).catch(err=>{
            this.danger(err.message)
        })

        return false
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

    private createEditorMd(id, options?:Object)
    {
        const defaultOptions = 
        {
            height:450,
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
}
