import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserService } from '../../../service/user.service'

declare var $

@Component({
    selector: 'user-center',
    styleUrls: ['./center.css', './timeline.css', '../../include/background/background.css'],
    templateUrl: './center.html',
    
})

export class UserCenterComponent implements OnInit
{
    private banner = `/images/blog-banner-user.png`
    private list = [1,2,3,4,5,6,7]
    private group_list = [1,2,3,4,5]
    private questions = []
    private notes = []
    private answers = []
    private favorites = []
    private follow =[]
    private fans =[]

    constructor(private activatedRoute: ActivatedRoute, private _service: UserService)
    {
        
    }

    public ngOnInit()
    {
        this._service.questions().then(data=>{
            this.questions = data
        })
        
        this._service.notes().then(data=>{
            this.notes = data
        })

        this._service.answers().then(data=>{
            this.answers = data
        })
        
        this._service.favorites().then(data=>{
            this.favorites = data
        })
        
        this._service.follow().then(data=>{
            this.follow = data
        })
        this._service.fans().then(data=>{
            this.fans = data
        })
    }

    public ngAfterViewInit()
    {
        
    }
}
