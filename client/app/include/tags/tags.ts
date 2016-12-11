import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { TagService } from '../../../service/tag.service'
declare var $

@Component({
    selector: 'tags',
    styleUrls: ['./tags.css'],
    templateUrl: './tags.html'
})

export class TagsComponent implements OnInit
{
    private tags = []
    @Input() type
    
    constructor(private activatedRoute: ActivatedRoute, private tagService: TagService){
        
    }

    ngOnInit(){
        this.tagService.listByCategory(this.type).then(tags=>{
            this.tags = tags
        }).catch(err=>{
            console.log(err)
        })
    }

    ngAfterViewInit()
    {
        
    }
}
