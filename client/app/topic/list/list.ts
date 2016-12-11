import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TopicService } from '../../../service/topic.service'
import { CategoryService } from '../../../service/category.service'

declare var $

@Component({
    selector: 'topic-list',
    styleUrls: ['./list.css'],
    templateUrl: './list.html'
})

export class TopicListComponent implements OnInit
{
    private topicType = ''
    private sortType = ''
    private banner = ''
    private title = ''
    private list = []
    private category = {}
    ngOnInit(){
        
    }
    
    constructor(private activatedRoute: ActivatedRoute, private topicService: TopicService, private CategoryService: CategoryService)
    {
        this.topicType = activatedRoute.snapshot.url[0].path
        this.banner = `/images/blog-banner-${this.topicType}.png`
        this.title = this.topicType==='news'?'文章':this.topicType==='question'?'问答': this.topicType==='note'?'笔记': ''

        this.CategoryService.findByName(this.topicType).then(category=>{
            this.category = category
        })

        activatedRoute.params.subscribe(params=>{
            this.sortType = params['sort']
        })

        this.topicService.listByType(this.topicType).then(list=>{
            this.list = list
        })
    }
    ngAfterViewInit()
    {
        
    }
}
