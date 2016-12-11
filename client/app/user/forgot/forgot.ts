import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

declare var $

@Component({
    selector: 'user-forgot',
    styleUrls: ['../signin/signin.css'],
    templateUrl: './forgot.html',
    
})

export class UserForgotComponent implements OnInit
{
    private banner = `/images/blog-banner-user.png`
    
    constructor(private activatedRoute: ActivatedRoute)
    {
        
    }

    ngOnInit(){

    }

    ngAfterViewInit()
    {
        
    }
}
